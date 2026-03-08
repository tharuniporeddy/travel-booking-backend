const { getDB } = require("../config/database")

// Search hotels
const searchHotels = async (city) => {

  const db = getDB()

  const query = `
    SELECT *
    FROM hotels
    WHERE city LIKE ?
  `

  return await db.all(query, [`%${city}%`])
}


// Get hotel details with rooms
const getHotelById = async (hotelId) => {

  const db = getDB()

  const query = `
    SELECT *
    FROM hotels
    WHERE hotel_id = ?
  `

  const hotel = await db.get(query, [hotelId])

  const rooms = await db.all(
    `SELECT * FROM hotel_rooms WHERE hotel_id = ?`,
    [hotelId]
  )

  return { hotel, rooms }
}


// Get room by ID
const getRoomById = async (roomId) => {

  const db = getDB()

  const query = `
    SELECT *
    FROM hotel_rooms
    WHERE room_id = ?
  `

  return await db.get(query, [roomId])
}


// Reduce room availability (prevent overbooking)
const reduceRoom = async (roomId, rooms) => {

  const db = getDB()

  const query = `
    UPDATE hotel_rooms
    SET available_rooms = available_rooms - ?
    WHERE room_id = ?
    AND available_rooms >= ?
  `

  const result = await db.run(query, [rooms, roomId, rooms])

  if (result.changes === 0) {
    throw new Error("No rooms available")
  }
}


// Create hotel booking
const createHotelBooking = async (booking) => {

  const db = getDB()

  const { userId, roomId, checkIn, checkOut, bookingReference, totalPrice } = booking

  const query = `
    INSERT INTO hotel_bookings
    (user_id, room_id, check_in, check_out, booking_reference, total_price)
    VALUES (?, ?, ?, ?, ?, ?)
  `

  const result = await db.run(query, [
    userId,
    roomId,
    checkIn,
    checkOut,
    bookingReference,
    totalPrice
  ])

  return result.lastID
}

module.exports = {
  searchHotels,
  getHotelById,
  getRoomById,
  reduceRoom,
  createHotelBooking
}