const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (role !== "customer" && role !== "provider") {
            return res.status(400).json({ message: "Invalid role" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();

        return res.status(201).json({
            message: "User registered successfully"
        });
    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. read email and password
        // 2. validate
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // 3. find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 4. compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // 5. save session
        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };
        // 6. set cookie
        // express-session handles the session cookie automatically

        // 7. return success
        return res.status(200).json({
            message: "Login successful",
            user: req.session.user
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

//logout
router.post("/logout", (req, res) => {
    // 1. destroy session
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).json({ message: "Logout failed" });
        }

        // 2. clear cookie
        res.clearCookie("connect.sid");

        // 3. return success
        return res.status(200).json({ message: "Logout successful" });
    });
});

module.exports = router;