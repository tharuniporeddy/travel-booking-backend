const express = require("express")
const router = express.Router()

const flightController = require("../controllers/flightController")
const authenticateToken = require("../middleware/auth")

// Search flights
router.get("/search", flightController.searchFlights)

// Get flight details
router.get("/:id", flightController.getFlightDetails)

// Book flight
router.post("/book", authenticateToken, flightController.bookFlight)

module.exports = router