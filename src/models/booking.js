const { getDB } = require("../config/database")

// Create flight booking
const createFlightBooking = async (booking) => {

  const db = getDB()

  const { userId, flightId, totalPrice, bookingReference } = booking

  const query = `
    INSERT INTO flight_bookings
    (user_id, flight_id, booking_reference, total_price)
    VALUES (?, ?, ?, ?)
  `

  const result = await db.run(query, [
    userId,
    flightId,
    bookingReference,
    totalPrice
  ])

  return result.lastID
}


// Get all bookings of a user
const getUserBookings = async (userId) => {

  const db = getDB()

  const query = `
    SELECT *
    FROM flight_bookings
    WHERE user_id = ?
  `

  const bookings = await db.all(query, [userId])

  return bookings
}


// Get booking details by ID
const getBookingById = async (type, bookingId) => {

  const db = getDB()

  let table = ""

  if (type === "flight") table = "flight_bookings"
  if (type === "hotel") table = "hotel_bookings"
  if (type === "package") table = "package_bookings"

  const query = `
    SELECT *
    FROM ${table}
    WHERE booking_id = ?
  `

  const booking = await db.get(query, [bookingId])

  return booking
}


// Cancel booking
const cancelBooking = async (type, bookingId) => {

  const db = getDB()

  let table = ""

  if (type === "flight") table = "flight_bookings"
  if (type === "hotel") table = "hotel_bookings"
  if (type === "package") table = "package_bookings"

  const query = `
    UPDATE ${table}
    SET status = 'CANCELLED'
    WHERE booking_id = ?
  `

  await db.run(query, [bookingId])
}


module.exports = {
  createFlightBooking,
  getUserBookings,
  getBookingById,
  cancelBooking
}