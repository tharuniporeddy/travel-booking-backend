const { getDB } = require("../config/database")

const getAirports = async () => {
  const db = getDB()

  const query = `
    SELECT code, name, city, country
    FROM airports
  `

  return await db.all(query)
}

const getCities = async () => {
  const db = getDB()

  const query = `
    SELECT DISTINCT city
    FROM airports
  `

  return await db.all(query)
}

module.exports = {
  getAirports,
  getCities
}