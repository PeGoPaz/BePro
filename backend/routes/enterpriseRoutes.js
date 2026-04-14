import express from "express";
import mongoose from "mongoose";

import Tutor from "../models/Enterprise.js";
import Booking from "../models/Booking.js";

const router = express.Router();

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

router.post("/:enterpriseId/services", async (req, res) => {
  try {
    const { enterpriseId } = req.params;
    const { subject, bio, price, availability } = req.body;

    if (!isValidObjectId(enterpriseId)) {
      return res.status(400).json({ message: "Invalid enterprise id" });
    }

    if (!subject || price === undefined || price === null) {
      return res.status(400).json({ message: "subject and price are required" });
    }

    const service = await Tutor.create({
      userId: enterpriseId,
      subject,
      bio,
      price,
      availability,
    });

    return res.status(201).json(service);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Failed to create service", error: error.message });
  }
});

router.get("/:enterpriseId/services", async (req, res) => {
  try {
    const { enterpriseId } = req.params;
    if (!isValidObjectId(enterpriseId)) {
      return res.status(400).json({ message: "Invalid enterprise id" });
    }

    const services = await Tutor.find({ userId: enterpriseId }).sort({ createdAt: -1 });
    return res.json(services);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch services", error: error.message });
  }
});

router.get("/:enterpriseId/services/:id", async (req, res) => {
  try {
    const { enterpriseId, id } = req.params;
    if (!isValidObjectId(enterpriseId)) {
      return res.status(400).json({ message: "Invalid enterprise id" });
    }
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid service id" });
    }

    const service = await Tutor.findOne({ _id: id, userId: enterpriseId });
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.json(service);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch service", error: error.message });
  }
});

router.patch("/:enterpriseId/services/:id", async (req, res) => {
  try {
    const { enterpriseId, id } = req.params;
    if (!isValidObjectId(enterpriseId)) {
      return res.status(400).json({ message: "Invalid enterprise id" });
    }
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid service id" });
    }

    const allowedFields = ["subject", "bio", "price", "availability"];
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
    );

    if (!Object.keys(updates).length) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const service = await Tutor.findOneAndUpdate(
      { _id: id, userId: enterpriseId },
      updates,
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.json(service);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Failed to update service", error: error.message });
  }
});

router.delete("/:enterpriseId/services/:id", async (req, res) => {
  try {
    const { enterpriseId, id } = req.params;
    if (!isValidObjectId(enterpriseId)) {
      return res.status(400).json({ message: "Invalid enterprise id" });
    }
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid service id" });
    }

    const deletedService = await Tutor.findOneAndDelete({
      _id: id,
      userId: enterpriseId,
    });
    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.json({ message: "Service deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete service", error: error.message });
  }
});

router.get("/:enterpriseId/bookings", async (req, res) => {
  try {
    const { enterpriseId } = req.params;
    if (!isValidObjectId(enterpriseId)) {
      return res.status(400).json({ message: "Invalid enterprise id" });
    }

    const services = await Tutor.find({ userId: enterpriseId }).select("_id");
    const serviceIds = services.map((service) => service._id);

    const bookings = await Booking.find({ tutorId: { $in: serviceIds } })
      .populate("studentId", "name email")
      .populate("tutorId", "subject price")
      .sort({ createdAt: -1 });

    return res.json(bookings);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
  }
});

router.patch("/:enterpriseId/bookings/:id/status", async (req, res) => {
  try {
    const { enterpriseId, id } = req.params;
    if (!isValidObjectId(enterpriseId)) {
      return res.status(400).json({ message: "Invalid enterprise id" });
    }
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid booking id" });
    }

    const { status } = req.body;
    const allowedStatuses = ["pending", "confirmed", "cancelled"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: `status must be one of: ${allowedStatuses.join(", ")}`,
      });
    }

    const booking = await Booking.findById(id).populate("tutorId", "userId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (!booking.tutorId || String(booking.tutorId.userId) !== String(enterpriseId)) {
      return res.status(403).json({ message: "You cannot modify this booking" });
    }

    booking.status = status;
    await booking.save();

    return res.json(booking);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update booking status", error: error.message });
  }
});

export default router;
