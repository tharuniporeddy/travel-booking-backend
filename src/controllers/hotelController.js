const hotelModel = require("../models/hotel")
const generateBookingReference = require("../utils/bookingReference")

// Search hotels
const searchHotels = async (req, res, next) => {
  try {

    const { city } = req.query

    const hotels = await hotelModel.searchHotels(city)

    res.json({
      success: true,
      hotels
    })

  } catch (error) {
    next(error)
  }
}


// Get hotel details
const getHotelDetails = async (req, res, next) => {
  try {

    const { id } = req.params

    const hotel = await hotelModel.getHotelById(id)

    res.json({
      success: true,
      hotel
    })

  } catch (error) {
    next(error)
  }
}


// Book hotel
const bookHotel = async (req, res, next) => {
  try {

    const { roomId, checkIn, checkOut } = req.body
    const userId = req.userId

    const today = new Date()
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)

    // Prevent booking in past
    if (checkInDate < today) {
      return res.status(400).json({
        message: "Check-in date cannot be in the past"
      })
    }

    // Date validation
    if (checkOutDate <= checkInDate) {
      return res.status(400).json({
        message: "Check-out date must be after check-in date"
      })
    }

    // Get room details
    const room = await hotelModel.getRoomById(roomId)

    if (!room) {
      return res.status(404).json({
        message: "Room not found"
      })
    }

    // Availability check
    if (room.available_rooms <= 0) {
      return res.status(409).json({
        message: "No rooms available"
      })
    }

    // Calculate nights
    const nights = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    )

    // Calculate total price
    const totalPrice = nights * room.price_per_night

    const bookingReference = generateBookingReference("HT")

    const bookingId = await hotelModel.createHotelBooking({
      userId,
      roomId,
      checkIn,
      checkOut,
      bookingReference,
      totalPrice
    })

    // Reduce available rooms
    await hotelModel.reduceRoom(roomId, 1)

    res.status(201).json({
      success: true,
      bookingReference,
      totalPrice,
      nights,
      bookingId
    })

  } catch (error) {
    next(error)
  }
}

module.exports = {
  searchHotels,
  getHotelDetails,
  bookHotel
}