-- Create Database Schema for Pooja Tours and Travel

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    role VARCHAR(10) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cabs Table
CREATE TABLE IF NOT EXISTS cabs (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL, -- e.g., Hatchback, Sedan, SUV, Bus
    name VARCHAR(100) NOT NULL, -- e.g., Maruti Dzire, Toyota Innova
    price_per_km DECIMAL(10, 2) NOT NULL,
    seating_capacity INT NOT NULL,
    image_url VARCHAR(255)
);

-- Buses Table
CREATE TABLE IF NOT EXISTS buses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL, -- e.g., Pooja Express, Purple Travels
    type VARCHAR(50) NOT NULL, -- e.g., AC Sleeper, AC Seater, Non-AC Seater
    total_seats INT NOT NULL DEFAULT 30,
    price_per_seat DECIMAL(10, 2) NOT NULL,
    departure_time TIME NOT NULL,
    arrival_time TIME NOT NULL,
    route_from VARCHAR(100) NOT NULL,
    route_to VARCHAR(100) NOT NULL
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    booking_type VARCHAR(10) NOT NULL, -- 'cab' or 'bus'
    cab_id INT REFERENCES cabs(id) ON DELETE SET NULL,
    bus_id INT REFERENCES buses(id) ON DELETE SET NULL,
    route_from VARCHAR(100) NOT NULL,
    route_to VARCHAR(100) NOT NULL,
    travel_date DATE NOT NULL,
    departure_time TIME,
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'confirmed', -- 'confirmed', 'cancelled', 'completed'
    seats_selected VARCHAR(50)[], -- For bus bookings (e.g., ARRAY['A1', 'A2'])
    passenger_details JSONB NOT NULL, -- Array of passengers with name, age, gender
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Cabs Data
INSERT INTO cabs (type, name, price_per_km, seating_capacity, image_url) VALUES
('Hatchback', 'Maruti Suzuki WagonR', 13.00, 4, 'hatchback.png'),
('SUV', 'Maruti Suzuki Brezza', 16.00, 4, 'brezza.png'),
('Bus', 'Pooja Luxury Traveler (17-seater)', 24.00, 17, 'traveller.png')
ON CONFLICT DO NOTHING;

-- Seed Buses Data (3 Buses available, 17-seaters as specified by user)
INSERT INTO buses (name, type, total_seats, price_per_seat, departure_time, arrival_time, route_from, route_to) VALUES
('Pooja Travels Luxury Coach 1', '17-Seater AC Luxury', 17, 750.00, '06:00:00', '10:00:00', 'Pune, Maharashtra, India', 'Mumbai, Maharashtra, India'),
('Pooja Travels Luxury Coach 2', '17-Seater AC Luxury', 17, 600.00, '07:30:00', '11:30:00', 'Pune, Maharashtra, India', 'Mahabaleshwar, Maharashtra, India'),
('Pooja Travels Luxury Coach 3', '17-Seater AC Luxury', 17, 700.00, '08:00:00', '13:30:00', 'Pune, Maharashtra, India', 'Shirdi, Maharashtra, India')
ON CONFLICT DO NOTHING;
