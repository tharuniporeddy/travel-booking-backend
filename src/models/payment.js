const { getDB } = require("../config/database")

// Create payment
const createPayment = async (payment) => {

  const db = getDB()

  const { bookingReference, amount, paymentMethod } = payment

  const query = `
    INSERT INTO payments
    (booking_reference, amount, status, payment_method)
    VALUES (?, ?, 'PENDING', ?)
  `

  const result = await db.run(query, [
    bookingReference,
    amount,
    paymentMethod
  ])

  return result.lastID
}


// Confirm payment
const confirmPayment = async (reference) => {

  const db = getDB()

  const query = `
    UPDATE payments
    SET status = 'SUCCESS'
    WHERE booking_reference = ?
  `

  await db.run(query, [reference])

}

module.exports = {
  createPayment,
  confirmPayment
}