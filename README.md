# 🌍 Travel Booking Backend API

A **Node.js backend project** for a **Travel Booking Platform** similar to **MakeMyTrip / Booking.com**.
This API allows users to search flights, hotels, and holiday packages, create bookings, and process payments.

The project demonstrates **REST API design, authentication, database management, and modular backend architecture**.

---

# 🚀 Tech Stack

* **Node.js**
* **Express.js**
* **SQLite**
* **JWT Authentication**
* **bcrypt**
* **Express Rate Limiter**
* **CORS**

---

# 📂 Project Structure

```
travel-booking-backend

src/
 ├── config/
 │    └── database.js
 │
 ├── controllers/
 │    ├── authController.js
 │    ├── flightController.js
 │    ├── hotelController.js
 │    ├── packageController.js
 │    ├── bookingController.js
 │    └── paymentController.js
 │
 ├── middleware/
 │    ├── auth.js
 │    ├── logger.js
 │    ├── validation.js
 │    ├── rateLimiter.js
 │    └── errorHandler.js
 │
 ├── models/
 │    ├── user.js
 │    ├── flight.js
 │    ├── hotel.js
 │    ├── package.js
 │    ├── booking.js
 │    └── payment.js
 │
 ├── routes/
 │    ├── authRoutes.js
 │    ├── flightRoutes.js
 │    ├── hotelRoutes.js
 │    ├── packageRoutes.js
 │    ├── bookingRoutes.js
 │    └── paymentRoutes.js
 │
 ├── utils/
 │    ├── helpers.js
 │    ├── bookingReference.js
 │    └── constants.js
 │
 └── app.js

database/
 ├── schema.sql
 └── seeds.sql

.env
package.json
README.md
```

---

# ⚙️ Installation Guide

## 1️⃣ Clone the Repository

```
git clone https://github.com/tharuniporeddy/travel-booking-backend.git
```

---

## 2️⃣ Navigate into the Project

```
cd travel-booking-backend
```

---

## 3️⃣ Install Dependencies

```
npm install
```

---

## 4️⃣ Create Environment File

Create a **.env** file in the root directory.

```
PORT=3000
JWT_SECRET=travel_secret_key
TOKEN_EXPIRE=1d
```

---

## 5️⃣ Start the Server

```
node src/app.js
```

or with **nodemon**

```
npm run dev
```

---

# 🌐 API Base URL

```
http://localhost:3000/api
```

---

# 🔐 Authentication APIs

## Register User

POST `/api/auth/register`

### Request

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "+1234567890",
  "dateOfBirth": "1990-01-01"
}
```

### Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "userId": 1
}
```

---

## Login User

POST `/api/auth/login`

### Request

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Response

```json
{
  "success": true,
  "token": "JWT_TOKEN"
}
```

---

# ✈️ Flight APIs

## Search Flights

GET `/api/flights/search`

Example:

```
/api/flights/search?from=DEL&to=BOM&departDate=2026-04-10
```

### Response

```json
{
  "success": true,
  "tripType": "oneway",
  "flights": [
    {
      "flightId": 1,
      "flightNumber": "AI501",
      "airline": "Air India",
      "from": "DEL",
      "to": "BOM",
      "departure": "2026-04-10T06:00:00",
      "arrival": "2026-04-10T08:30:00",
      "duration": "2h 30m",
      "price": 5500,
      "availableSeats": 45,
      "class": "economy"
    }
  ]
}
```

---

## Get Flight Details

GET

```
/api/flights/:id
```

---

## Book Flight

POST

```
/api/flights/book
```

Requires **JWT Authentication**

---

# 🏨 Hotel APIs

## Search Hotels

```
GET /api/hotels/search?city=Delhi
```

---

## Get Hotel Details

```
GET /api/hotels/:id
```

---

## Book Hotel

```
POST /api/hotels/book
```

---

# 🌴 Holiday Package APIs

## Search Packages

```
GET /api/packages/search?city=Goa
```

---

## Get Package Details

```
GET /api/packages/:id
```

---

## Book Package

```
POST /api/packages/book
```

---

# 📦 Booking APIs

```
GET /api/bookings
GET /api/bookings/:type/:id
POST /api/bookings/:type/:id/cancel
```

---

# 💳 Payment APIs

## Initiate Payment

```
POST /api/payments/initiate
```

---

## Confirm Payment

```
POST /api/payments/confirm
```

---

# 🗄️ Database

SQLite database is used.

Tables:

* users
* airports
* airlines
* flights
* hotels
* hotel_rooms
* holiday_packages
* flight_bookings
* hotel_bookings
* package_bookings
* passengers
* payments

---

# 🧠 Features Implemented

✔ JWT Authentication
✔ Flight Search with filters
✔ Hotel Search
✔ Holiday Packages
✔ Flight Booking
✔ Hotel Booking
✔ Package Booking
✔ Payment APIs
✔ Booking Reference Generator
✔ Rate Limiting Middleware
✔ Logging Middleware
✔ Input Validation
✔ Prevent Overbooking

---

# 🔒 Security Features

* Password hashing using **bcrypt**
* **JWT authentication**
* **Rate limiting**
* **SQL injection prevention**
* **Input validation**

---

# 📬 Postman Collection

All APIs can be tested using **Postman**.

Base URL

```
http://localhost:3000/api
```

---

# 👩‍💻 Author

**Tharuni Poreddy**

GitHub
https://github.com/tharuniporeddy

---

# ⭐ Project Purpose

This project was built as part of a **Node.js backend development project** to demonstrate:

* REST API design
* Database schema design
* Authentication systems
* Backend architecture
* Real-world travel booking logic

---

# 📜 License

This project is created for **educational purposes**.
