PRAGMA foreign_keys = ON;

-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT,
    date_of_birth DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- AIRPORTS
CREATE TABLE  IF NOT EXISTS airports (
    airport_id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL
);

-- AIRLINES
CREATE TABLE  IF NOT EXISTS airlines (
    airline_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL
);

-- FLIGHTS
CREATE TABLE IF NOT EXISTS flights (
    flight_id INTEGER PRIMARY KEY AUTOINCREMENT,
    airline_id INTEGER,
    flight_number TEXT,
    source_airport TEXT,
    destination_airport TEXT,
    departure_time TEXT,
    arrival_time TEXT,
    price REAL,
    total_seats INTEGER,
    available_seats INTEGER,

    FOREIGN KEY (airline_id) REFERENCES airlines(airline_id)
);

-- HOTELS
CREATE TABLE  IF NOT EXISTS hotels (
    hotel_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    rating REAL,
    address TEXT
);

-- HOTEL ROOMS
CREATE TABLE  IF NOT EXISTS hotel_rooms (
    room_id INTEGER PRIMARY KEY AUTOINCREMENT,
    hotel_id INTEGER,
    room_type TEXT,
    price_per_night REAL,
    total_rooms INTEGER,
    available_rooms INTEGER,

    FOREIGN KEY (hotel_id) REFERENCES hotels(hotel_id)
);

-- HOLIDAY PACKAGES
CREATE TABLE  IF NOT EXISTS holiday_packages (
    package_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    city TEXT,
    description TEXT,
    price REAL,
    duration_days INTEGER
);

-- FLIGHT BOOKINGS
CREATE TABLE  IF NOT EXISTS flight_bookings (
    booking_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    flight_id INTEGER,
    booking_reference TEXT UNIQUE,
    total_price REAL,
    booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'CONFIRMED',

    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (flight_id) REFERENCES flights(flight_id)
);

-- HOTEL BOOKINGS
CREATE TABLE  IF NOT EXISTS hotel_bookings (
    booking_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    room_id INTEGER,
    check_in DATE,
    check_out DATE,
    booking_reference TEXT UNIQUE,
    total_price REAL,
    status TEXT DEFAULT 'CONFIRMED',

    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (room_id) REFERENCES hotel_rooms(room_id)
);

-- PACKAGE BOOKINGS
CREATE TABLE  IF NOT EXISTS package_bookings (
    booking_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    package_id INTEGER,
    booking_reference TEXT UNIQUE,
    total_price REAL,
    status TEXT DEFAULT 'CONFIRMED',

    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (package_id) REFERENCES holiday_packages(package_id)
);

-- PASSENGERS

CREATE TABLE  IF NOT EXISTS passengers (
    passenger_id INTEGER PRIMARY KEY AUTOINCREMENT,
    booking_reference TEXT,
    title TEXT,
    first_name TEXT,
    last_name TEXT,
    date_of_birth DATE,
    passport_number TEXT,

    FOREIGN KEY (booking_reference) REFERENCES flight_bookings(booking_reference)
);
-- PAYMENTS
CREATE TABLE IF NOT EXISTS payments (
    payment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    booking_reference TEXT,
    amount REAL,
    status TEXT,
    payment_method TEXT,
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP
);
