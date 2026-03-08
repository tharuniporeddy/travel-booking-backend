const packageModel = require("../models/package")
const generateBookingReference = require("../utils/bookingReference")


// Search packages
const searchPackages = async (req, res, next) => {

  try {

    const { city } = req.query

    const packages = await packageModel.searchPackages(city)

    res.json({
      success: true,
      packages
    })

  } catch (error) {
    next(error)
  }

}


// Get package details
const getPackageDetails = async (req, res, next) => {

  try {

    const { id } = req.params

    const packageDetails = await packageModel.getPackageById(id)

    res.json({
      success: true,
      package: packageDetails
    })

  } catch (error) {
    next(error)
  }

}


// Book package with child pricing
const bookPackage = async (req, res, next) => {

  try {

    const { packageId, adults, children } = req.body
    const userId = req.userId

    const pkg = await packageModel.getPackageById(packageId)

    if (!pkg) {
      return res.status(404).json({
        message: "Package not found"
      })
    }

    const pricePerPerson = pkg.price

    const adultPrice = pricePerPerson * adults
    const childPrice = (pricePerPerson * 0.5) * children

    const totalPrice = adultPrice + childPrice

    const bookingReference = generateBookingReference("PK")

    const bookingId = await packageModel.createPackageBooking({
      userId,
      packageId,
      bookingReference,
      totalPrice
    })

    res.status(201).json({
      success: true,
      bookingReference,
      adults,
      children,
      totalPrice,
      bookingId
    })

  } catch (error) {
    next(error)
  }

}

module.exports = {
  searchPackages,
  getPackageDetails,
  bookPackage
}