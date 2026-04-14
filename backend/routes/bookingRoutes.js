const express = require("express");
const Booking = require("../models/Booking");
const { isAuthenticated } = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE booking
router.post("/", isAuthenticated, async (req, res) => {
    try {
        // 1. get providerId, bookingDate, notes from req.body
        const { providerId, bookingDate, notes } = req.body;

        // 2. validate required fields
        if (!providerId || !bookingDate) {
            return res.status(400).json({
                message: "providerId and bookingDate are required"
            });
        }

        // 3. create new booking
        // customerId should come from req.session.userId
        const newBooking = new Booking({
            customerId: req.session.userId,
            providerId,
            bookingDate,
            notes,
            status: "pending"
        });

        // 4. save booking
        await newBooking.save();

        // 5. return 201
        return res.status(201).json({
            message: "Booking created successfully",
            booking: newBooking
        });
    } catch (error) {
        console.error("Create booking error:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

// READ all bookings for current user
router.get("/", isAuthenticated, async (req, res) => {
    try {
        // 1. find bookings by current logged-in user
        // customerId: req.session.userId
        const bookings = await Booking.find({
            customerId: req.session.userId
        });

        // 2. return array of bookings
        return res.status(200).json(bookings);
    } catch (error) {
        console.error("Get bookings error:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

// READ one booking by id
router.get("/:id", isAuthenticated, async (req, res) => {
    try {
        // 1. get booking id from req.params.id
        const bookingId = req.params.id;

        // 2. find booking by id
        const booking = await Booking.findById(bookingId);

        // 3. if not found -> return 404
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // 4. check ownership
        // if booking.customerId does not match req.session.userId -> return 403
        if (booking.customerId.toString() !== req.session.userId) {
            return res.status(403).json({ message: "Access denied" });
        }

        // 5. return booking
        return res.status(200).json(booking);
    } catch (error) {
        console.error("Get booking error:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

// UPDATE booking
router.put("/:id", isAuthenticated, async (req, res) => {
    try {
        // 1. get booking id from req.params.id
        const bookingId = req.params.id;

        // 2. get fields from req.body
        // bookingDate, notes, status
        const { bookingDate, notes, status } = req.body;

        // 3. find booking by id
        const booking = await Booking.findById(bookingId);

        // 4. if not found -> return 404
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // 5. check ownership
        // if not owner -> return 403
        if (booking.customerId.toString() !== req.session.userId) {
            return res.status(403).json({ message: "Access denied" });
        }

        // 6. update allowed fields only
        if (bookingDate) booking.bookingDate = bookingDate;
        if (notes !== undefined) booking.notes = notes;
        if (status) booking.status = status;

        // 7. save updated booking
        await booking.save();

        // 8. return success response
        return res.status(200).json({
            message: "Booking updated successfully",
            booking
        });
    } catch (error) {
        console.error("Update booking error:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

// DELETE booking
router.delete("/:id", isAuthenticated, async (req, res) => {
    try {
        // 1. get booking id from req.params.id
        const bookingId = req.params.id;

        // 2. find booking by id
        const booking = await Booking.findById(bookingId);

        // 3. if not found -> return 404
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // 4. check ownership
        // if not owner -> return 403
        if (booking.customerId.toString() !== req.session.userId) {
            return res.status(403).json({ message: "Access denied" });
        }

        // 5. delete booking
        // or set status = "cancelled"
        await Booking.findByIdAndDelete(bookingId);

        // 6. return success response
        return res.status(200).json({
            message: "Booking deleted successfully"
        });
    } catch (error) {
        console.error("Delete booking error:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;