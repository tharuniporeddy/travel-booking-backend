// Calculate number of nights between two dates
const calculateNights = (checkIn, checkOut) => {

  const start = new Date(checkIn)
  const end = new Date(checkOut)

  const difference = end - start

  return Math.ceil(difference / (1000 * 60 * 60 * 24))
}

// Validate date format
const isValidDate = (date) => {
  const d = new Date(date)
  return !isNaN(d.getTime())
}

module.exports = {
  calculateNights,
  isValidDate
}