const express = require("express")
const router = express.Router()

const airportController = require("../controllers/airportController")

router.get("/airports", airportController.getAirports)
router.get("/cities", airportController.getCities)

module.exports = router