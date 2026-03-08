const bookingModel = require("../models/booking")
const flightModel = require("../models/flight")
const generateBookingReference = require("../utils/bookingReference")

// Book Flight
const bookFlight = async (req, res, next) => {
  try {

    const { flightId, price } = req.body
    const userId = req.userId

    // Check flight exists
    const flight = await flightModel.getFlightById(flightId)

    if (!flight) {
      return res.status(404).json({
        message: "Flight not found"
      })
    }

    // Check seat availability
    if (flight.available_seats <= 0) {
      return res.status(409).json({
        message: "No seats available"
      })
    }

    const bookingReference = generateBookingReference("FL")

    await bookingModel.createFlightBooking({
      userId,
      flightId,
      totalPrice: price,
      bookingReference
    })

    // Reduce seat count
    await flightModel.reduceSeats(flightId, 1)

    res.status(201).json({
      success: true,
      message: "Flight booked successfully",
      bookingReference
    })

  } catch (error) {
    next(error)
  }
}


// Get All Bookings for Logged-in User
const getBookings = async (req, res, next) => {
  try {

    const userId = req.userId

    const bookings = await bookingModel.getUserBookings(userId)

    res.json({
  success: true,
  bookings
})

  } catch (error) {
    next(error)
  }
}


// Get booking details
const getBookingDetails = async (req, res, next) => {
  try {

    const { type, bookingId } = req.params

    const booking = await bookingModel.getBookingById(type, bookingId)

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      })
    }

    res.json({
      success: true,
      booking
    })

  } catch (error) {
    next(error)
  }
}


// Cancel booking
const cancelBooking = async (req, res, next) => {
  try {

    const { type, bookingId } = req.params

    await bookingModel.cancelBooking(type, bookingId)

    res.json({
      success: true,
      message: "Booking cancelled successfully"
    })

  } catch (error) {
    next(error)
  }
}

module.exports = {
  bookFlight,
  getBookings,
  getBookingDetails,
  cancelBooking
}