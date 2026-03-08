const express = require("express")
const router = express.Router()

const paymentController = require("../controllers/paymentController")
const authenticateToken = require("../middleware/auth")

router.post("/initiate", authenticateToken, paymentController.initiatePayment)
router.post("/confirm", authenticateToken, paymentController.confirmPayment)
module.exports = router