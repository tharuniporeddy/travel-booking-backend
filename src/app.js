require("dotenv").config()

const express = require("express")
const cors = require("cors")

const logger = require("./middleware/logger")
const limiter = require("./middleware/rateLimiter")
const airportRoutes = require("./routes/airportRoutes")
const authRoutes = require("./routes/authRoutes")
const flightRoutes = require("./routes/flightRoutes")
const hotelRoutes = require("./routes/hotelRoutes")
const packageRoutes = require("./routes/packageRoutes")
const bookingRoutes = require("./routes/bookingRoutes")
const paymentRoutes = require("./routes/paymentRoutes")
 const { initializeDatabase } = require("./config/database")

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(logger)
app.use(limiter)

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/flights", flightRoutes)
app.use("/api/hotels", hotelRoutes)
app.use("/api/packages", packageRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/payments", paymentRoutes)
app.use("/api", airportRoutes)

// Test route
app.get("/", (req, res) => {
  res.send("Travel Booking API Running 🚀")
})

const PORT = process.env.PORT || 3000

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})