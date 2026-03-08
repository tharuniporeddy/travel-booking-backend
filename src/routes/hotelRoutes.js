const express = require("express")
const router = express.Router()

const hotelController = require("../controllers/hotelController")
const authenticateToken = require("../middleware/auth")

router.get("/search", hotelController.searchHotels)

router.get("/:id", hotelController.getHotelDetails)

router.post("/book", authenticateToken, hotelController.bookHotel)

module.exports = router