const { getDB } = require("../config/database")

// Search flights with filters
const searchFlights = async (from, to) => {

  const db = getDB()

  let query = `
    SELECT 
      f.flight_id AS flightId,
      f.flight_number AS flightNumber,
      a.name AS airline,
      f.source_airport AS "from",
      f.destination_airport AS "to",
      f.departure_time AS departure,
      f.arrival_time AS arrival,
      f.base_price AS price,
      f.available_seats AS availableSeats
    FROM flights f
    JOIN airlines a
    ON f.airline_id = a.airline_id
    WHERE f.source_airport = ?
    AND f.destination_airport = ?
  `

  const flights = await db.all(query, [from, to])

  return flights
}

const getFlightById = async (id) => {

  const db = getDB()

  const query = `
    SELECT *
    FROM flights
    WHERE flight_id = ?
  `

  return await db.get(query, [id])
}

const reduceSeats = async (flightId, seats) => {

  const db = getDB()

  const query = `
    UPDATE flights
    SET available_seats = available_seats - ?
    WHERE flight_id = ?
  `

  await db.run(query, [seats, flightId])
}

module.exports = {
  searchFlights,
  getFlightById,
  reduceSeats
}