const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user")

// Register user
const registerUser = async (req, res, next) => {

  try {

    const { firstName, lastName, email, password, phone, dateOfBirth } = req.body

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      })
    }

    const existingUser = await userModel.getUserByEmail(email)

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const userId = await userModel.createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      dateOfBirth
    })

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId
    })

  } catch (error) {
    next(error)
  }
}



// Login user
const loginUser = async (req, res, next) => {

  try {

    const { email, password } = req.body

    const user = await userModel.getUserByEmail(email)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email"
      })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      })
    }

    const token = jwt.sign(
      { userId: user.user_id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRE }
    )

    res.json({
      success: true,
      token,
      user: {
        id: user.user_id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email
      }
    })

  } catch (error) {
    next(error)
  }
}

module.exports = {
  registerUser,
  loginUser
}