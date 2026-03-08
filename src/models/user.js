const { getDB } = require("../config/database")

// Find user by email
const getUserByEmail = async (email) => {

  const db = getDB()

  const query = `
    SELECT *
    FROM users
    WHERE email = ?
  `

  return await db.get(query, [email])
}


// Create new user
const createUser = async (user) => {

  const db = getDB()

  const { firstName, lastName, email, password, phone, dateOfBirth } = user

  const query = `
    INSERT INTO users
    (first_name, last_name, email, password, phone, date_of_birth)
    VALUES (?, ?, ?, ?, ?, ?)
  `

  const result = await db.run(query, [
    firstName,
    lastName,
    email,
    password,
    phone,
    dateOfBirth
  ])

  return result.lastID
}

module.exports = {
  getUserByEmail,
  createUser
}