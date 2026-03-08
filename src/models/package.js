const { getDB } = require("../config/database")

// Search packages
const searchPackages = async (city) => {

  const db = getDB()

  const query = `
    SELECT *
    FROM holiday_packages
    WHERE city LIKE ?
  `

  return await db.all(query, [`%${city}%`])
}


// Get package details
const getPackageById = async (packageId) => {

  const db = getDB()

  const query = `
    SELECT *
    FROM holiday_packages
    WHERE package_id = ?
  `

  return await db.get(query, [packageId])
}


// Book package
const createPackageBooking = async (booking) => {

  const db = getDB()

  const { userId, packageId, bookingReference, totalPrice } = booking

  const query = `
    INSERT INTO package_bookings
    (user_id, package_id, booking_reference, total_price)
    VALUES (?, ?, ?, ?)
  `

  const result = await db.run(query, [
    userId,
    packageId,
    bookingReference,
    totalPrice
  ])

  return result.lastID
}

module.exports = {
  searchPackages,
  getPackageById,
  createPackageBooking
}