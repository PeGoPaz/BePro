import express from "express";
import bcrypt from "bcrypt";
import validator from "validator";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please provide a valid email address" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    if (!["user", "enterprise"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatarUrl: newUser.avatarUrl || "",
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.user = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      name: user.name,
      avatarUrl: user.avatarUrl || "",
    };

    return res.status(200).json({
      message: "Login successful",
      session: req.session.user,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl || "",
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.patch("/me/avatar", requireAuth, async (req, res) => {
  try {
    const { avatarUrl } = req.body;

    if (avatarUrl !== null && typeof avatarUrl !== "string") {
      return res.status(400).json({ message: "avatarUrl must be a string or null" });
    }

    const trimmedAvatar = typeof avatarUrl === "string" ? avatarUrl.trim() : "";
    if (trimmedAvatar && !trimmedAvatar.startsWith("data:image/")) {
      return res.status(400).json({ message: "avatarUrl must be a valid image data URL" });
    }
    if (trimmedAvatar.length > 4_000_000) {
      return res.status(400).json({ message: "Avatar image is too large" });
    }

    const user = await User.findByIdAndUpdate(
      req.session.user.id,
      { avatarUrl: trimmedAvatar },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.session.user.avatarUrl = user.avatarUrl || "";

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/logout", requireAuth, (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ message: "Could not logout", error: error.message });
    }

    res.clearCookie("bepro.sid");
    return res.status(200).json({ message: "Logout successful" });
  });
});

export default router;
