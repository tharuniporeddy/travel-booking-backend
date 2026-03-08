const airportModel = require("../models/airport")

const getAirports = async (req, res, next) => {
  try {

    const airports = await airportModel.getAirports()

    res.json({
      success: true,
      airports
    })

  } catch (error) {
    next(error)
  }
}

const getCities = async (req, res, next) => {
  try {

    const cities = await airportModel.getCities()

    res.json({
      success: true,
      cities
    })

  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAirports,
  getCities
}