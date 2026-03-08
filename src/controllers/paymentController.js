const paymentModel = require("../models/payment")

// Initiate payment
const initiatePayment = async (req, res, next) => {
  try {

    const { reference, amount, method } = req.body

    const paymentId = await paymentModel.createPayment({
      reference,
      amount,
      method,
      status: "PENDING"
    })

    res.status(201).json({
      message: "Payment initiated",
      paymentId
    })

  } catch (error) {
    next(error)
  }
}
const confirmPayment = async (req, res, next) => {

  try {

    const { bookingReference } = req.body

    await paymentModel.confirmPayment(bookingReference)

    res.json({
      success: true,
      message: "Payment confirmed successfully"
    })

  } catch (error) {
    next(error)
  }

}
module.exports = {
  initiatePayment,
  confirmPayment
}