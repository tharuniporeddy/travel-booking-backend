const express = require("express")
const router = express.Router()

const authenticateToken = require("../middleware/auth")
const bookingController = require("../controllers/bookingController")

// Flight booking
router.post("/flight", authenticateToken, bookingController.bookFlight)

// Get all user bookings
router.get("/", authenticateToken, bookingController.getBookings)

// Get booking details
router.get("/:type/:bookingId", authenticateToken, bookingController.getBookingDetails)

// Cancel booking
router.post("/:type/:bookingId/cancel", authenticateToken, bookingController.cancelBooking)

module.exports = router