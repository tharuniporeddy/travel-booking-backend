const flightModel = require("../models/flight")
const bookingModel = require("../models/booking")
const generateBookingReference = require("../utils/bookingReference")

// Search flights

// Search flights
const searchFlights = async (req, res, next) => {

  try {

    const { from, to, tripType = "oneway" } = req.query

    const flights = await flightModel.searchFlights(from, to)

    res.json({
      success: true,
      tripType,
      flights
    })

  } catch (error) {
    next(error)
  }
}

// Get flight details
const getFlightDetails = async (req, res, next) => {

  try {

    const { id } = req.params

    const flight = await flightModel.getFlightById(id)

    if (!flight) {
      return res.status(404).json({
        success: false,
        message: "Flight not found"
      })
    }

    res.json({
      success: true,
      flight
    })

  } catch (error) {
    next(error)
  }
}



// Book flight
const bookFlight = async (req, res, next) => {

  try {

    const { flightId, passengers } = req.body
    const userId = req.userId

    const flight = await flightModel.getFlightById(flightId)

    if (!flight) {
      return res.status(404).json({
        message: "Flight not found"
      })
    }

    const passengerCount = passengers.length

    if (flight.available_seats < passengerCount) {
      return res.status(409).json({
        message: "Not enough seats available"
      })
    }

    const bookingReference = generateBookingReference("FL")

    const totalAmount = flight.price * passengerCount

    const bookingId = await bookingModel.createFlightBooking({
      userId,
      flightId,
      bookingReference,
      totalPrice: totalAmount
    })

    await flightModel.reduceSeats(flightId, passengerCount)

    res.status(201).json({
      success: true,
      bookingReference,
      totalAmount,
      bookingId
    })

  } catch (error) {
    next(error)
  }

}

module.exports = {
  searchFlights,
  getFlightDetails,
  bookFlight
}