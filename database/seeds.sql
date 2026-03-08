-- AIRPORTS
INSERT INTO airports (code, name, city, country) VALUES
('DEL','Indira Gandhi International Airport','Delhi','India'),
('BOM','Chhatrapati Shivaji International Airport','Mumbai','India'),
('BLR','Kempegowda International Airport','Bangalore','India'),
('HYD','Rajiv Gandhi International Airport','Hyderabad','India'),
('MAA','Chennai International Airport','Chennai','India'),
('CCU','Netaji Subhas Chandra Bose Airport','Kolkata','India'),
('GOI','Goa International Airport','Goa','India'),
('AMD','Sardar Vallabhbhai Patel Airport','Ahmedabad','India'),
('PNQ','Pune International Airport','Pune','India'),
('COK','Cochin International Airport','Kochi','India');

-- AIRLINES


INSERT INTO airlines (name, code) VALUES
('Air India', 'AI'),
('IndiGo', '6E'),
('Vistara', 'UK'),
('SpiceJet', 'SG');

-- FLIGHTS

INSERT INTO flights 
(airline_id, flight_number, source_airport, destination_airport, departure_time, arrival_time, base_price, total_seats, available_seats)
VALUES
(1, 'AI501', 'DEL', 'BOM', '2026-04-10T06:00:00', '2026-04-10T08:30:00', 5500, 180, 45),
(2, '6E302', 'DEL', 'BOM', '2026-04-10T09:00:00', '2026-04-10T11:30:00', 5200, 180, 60),
(3, 'UK701', 'DEL', 'BLR', '2026-04-10T07:00:00', '2026-04-10T10:00:00', 6500, 180, 50),
(1, 'AI202', 'BOM', 'DEL', '2026-04-10T14:00:00', '2026-04-10T16:30:00', 5600, 180, 40),
(2, '6E404', 'BLR', 'DEL', '2026-04-10T11:00:00', '2026-04-10T13:30:00', 6000, 180, 70),
(4, 'SG501', 'DEL', 'GOA', '2026-04-10T10:00:00', '2026-04-10T12:30:00', 4800, 180, 55);
-- HOTELS
INSERT INTO hotels (name, city, rating, address) VALUES
('Taj Palace','Delhi',4.8,'Chanakyapuri'),
('The Oberoi','Mumbai',4.7,'Nariman Point'),
('ITC Gardenia','Bangalore',4.6,'Residency Road'),
('Park Hyatt','Hyderabad',4.5,'Banjara Hills'),
('Leela Palace','Chennai',4.7,'Adyar'),
('Grand Hyatt','Goa',4.6,'Bambolim'),
('Radisson Blu','Pune',4.3,'Kharadi'),
('Hyatt Regency','Kolkata',4.4,'Salt Lake'),
('Novotel','Ahmedabad',4.2,'SG Highway'),
('Marriott','Kochi',4.6,'Lulu Mall');

-- HOTEL ROOMS
INSERT INTO hotel_rooms (hotel_id, room_type, price_per_night, total_rooms, available_rooms) VALUES
(1,'Deluxe',5000,50,50),
(1,'Suite',9000,20,20),
(2,'Deluxe',6500,40,40),
(3,'Standard',4000,60,60),
(4,'Deluxe',5200,45,45),
(5,'Suite',10000,25,25),
(6,'Standard',3800,70,70),
(7,'Deluxe',4500,50,50),
(8,'Suite',8000,30,30),
(9,'Standard',3500,40,40);

-- HOLIDAY PACKAGES
INSERT INTO holiday_packages (title, city, description, price, duration_days) VALUES
('Goa Beach Holiday','Goa','3 nights beach stay with sightseeing',15000,3),
('Kerala Backwaters','Kochi','Houseboat experience in Kerala',18000,4),
('Himalayan Adventure','Manali','Mountain trekking package',20000,5),
('Golden Triangle','Delhi','Delhi Agra Jaipur tour',17000,4),
('Andaman Island Escape','Andaman','Island beach vacation',25000,5);