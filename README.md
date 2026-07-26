# Pooja Tours & Travels — Online Bus & Car Booking Platform

A premium outstation cab and bus rental platform for **Pooja Tours & Travels** (Pune, Maharashtra). This project replaces manual telephone and WhatsApp scheduling with a digital booking portal, a driver panel, and an administration dashboard, streamlining booking confirmations, fare calculations, and vehicle/driver assignments.

---

## 📅 Project Metadata & Timeline
- **Project Name:** Pooja Tours & Travels Online Booking Portal
- **Start Date:** July 8, 2026
- **Phase 1 Release Date:** July 14, 2026
- **Languages:** JavaScript (ES6+), HTML5, SQL, CSS3
- **Primary Stack (PERN):** PostgreSQL, Express.js, React (Vite), Node.js
- **Styling Framework:** Tailwind CSS & Custom CSS Arches Layout

---

## 📂 Project Folder Structure

```
Pooja Tours and Travel/
├── client/                           # React frontend client application
│   ├── public/                       # Public static assets & images
│   │   ├── pooja-logo-clean.png      # Brand logo
│   │   ├── travel-watermark-clean.png # Subtle repeating background watermark
│   │   └── (vehicle & destination photos...)
│   ├── src/                          # Frontend source code
│   │   ├── components/               # React page & layout components
│   │   │   ├── AboutUs.jsx           # Editorial About Us page with mandala animations
│   │   │   ├── AdminDashboard.jsx    # Portal for booking approval & fleet management
│   │   │   ├── AuthModal.jsx         # Dual-screen Login & Sign-up modal (Customer/Chauffeur)
│   │   │   ├── BlogPage.jsx          # Travel Blog article feed with category filters
│   │   │   ├── FAQs.jsx              # Frequently Asked Questions accordion lists
│   │   │   ├── FleetSection.jsx      # Slide-carousels of available vehicles
│   │   │   ├── Footer.jsx            # Multi-column footer with quick links & hotlines
│   │   │   ├── GalleryPage.jsx       # Interactive gallery of matching Force Travellers
│   │   │   ├── Header.jsx            # Legacy navigation header
│   │   │   ├── HeaderBreadcrumbs.jsx # Subpage title cards
│   │   │   ├── HowItWorks.jsx        # 4-Step visual workflow indicators
│   │   │   ├── OurServices.jsx       # Restored Our Services accordion section
│   │   │   ├── PackagesPage.jsx      # Outstation tours catalog & booking connectors
│   │   │   ├── PoojaLanding.jsx      # Core landing page (Hero, arches collage, search widget)
│   │   │   ├── Reviews.jsx           # Curated homepage user feedback cards
│   │   │   ├── TestimonialsPage.jsx  # Reviews board with interactive write-a-review form
│   │   │   └── WhyChooseUs.jsx       # USP highlights section (No hidden charges, GPS, etc.)
│   │   ├── data/                     # Mock data repositories
│   │   │   ├── blogData.js           # Sample blog post content
│   │   │   ├── galleryImages.js      # Fleet gallery lists
│   │   │   └── testimonialsData.js   # Pre-seeded reviews list
│   │   ├── App.jsx                   # Central page router, state manager & modal wrapper
│   │   ├── index.css                 # CSS variables, Tailwind mappings & custom keyframes
│   │   └── main.jsx                  # React DOM rendering entry point
│   ├── index.html                    # Single Page Application HTML root
│   ├── package.json                  # Client NPM metadata & script commands
│   └── vite.config.js                # Vite compiler & local dev server configuration
├── server/                           # Node.js / Express backend server api
│   ├── routes/                       # Express router endpoints
│   │   ├── auth.js                   # Client and chauffeur login/register controls
│   │   ├── bookings.js               # Booking requests & status updates
│   │   ├── buses.js                  # Bus fleet options & availability listings
│   │   ├── cabs.js                   # Car rates and fleet routes
│   │   └── contact.js                # Customer query & email notification forms
│   ├── database.sql                  # PostgreSQL tables layout DDL queries
│   ├── db.js                         # Database connector pool wrapper (node-postgres)
│   ├── package.json                  # Server NPM dependencies & commands
│   └── server.js                 # Express server startup entry point
└── README.md                         # Detailed project documentation
```

---

## 🛠️ Technology Stack & Libraries

### 💻 Frontend Client (Vite + React)
- **Vite:** High-performance React bundler and compiler.
- **Tailwind CSS:** Utility-first CSS engine for responsive editorial styling.
- **Lucide React:** Icon library for visual metadata representation.
- **Vite Build Config:** Configured for code chunking, asset compression, and absolute local imports.

### ⚙️ Backend Server (Express + Node.js)
- **express:** Minimalist API server router.
- **pg (node-postgres):** Non-blocking PostgreSQL client connector.
- **bcryptjs:** Secures client and driver passwords using 10-salt hashing.
- **jsonwebtoken (JWT):** Secures route access using role-based session tokens.
- **cors:** Enables cross-origin request policies between Vite (port 5173) and Node.js (port 5000).
- **dotenv:** Loads secure environment credentials from `.env` files.

### 🗄️ Database (PostgreSQL)
- Schema contains tables for: `users`, `vehicles`, `drivers`, `trips`, `payments`, and `testimonials`.
- Uses foreign key constraints for integrity (`driver_id` and `vehicle_id` map to `trips`).

---

## 📐 Functional Specifications by Section

### 1. Unified Sticky Header & Navigation
- A clean, modern navbar that remains fixed at the top of the viewport during scroll.
- Displays navigation paths: `Home`, `Tours`, `Gallery`, `About Us`, `Blog`, and `Contact Us`.
- Highlights the active navigation item dynamically using Pooja Travels' signature cyan color (`#00b4d8`).
- Includes a prominent blue **Review** button directing users to the reviews board, and a quick **Login** gateway.

### 2. Homepage Landing (`PoojaLanding`)
- **Split-Screen Editorial Layout:** Pure white on the left (featuring bold headlines and the booking form) and warm cream (`#f4f3ed`) on the right.
- **Arches Collage:** Features triple vertical golden-arched panels displaying scenery of Maharashtra (roads, hills, and forts) overlaying the background.
- **Search Widget:** Interactive tabs for Trip Types (One-way, Round trip, Multicity, Local) with inputs for Destination, Dates, Passenger counts, and Vehicle choices.

### 3. Our Fleet Section (`FleetSection`)
- Displays available vehicle assets (e.g., Maruti Suzuki Swift, Ertiga, Kia Carens, Luxury 17-Seater buses).
- Includes seat indicators, luggage capacity limits, and pricing.
- Links cards directly back to the booking selector engine.

### 4. Our Services Accordion (`OurServices`)
- Structured list categorizing offerings: **Airports Transfer**, **Popular Destinations**, and **Pune Local & Monthly Booking**.
- Expands dynamically via accordion triggers.
- Features quick-click links triggering WhatsApp pre-filled messages with booking parameters.

### 5. Traveler Reviews & Testimonials (`TestimonialsPage`)
- Renders pre-seeded ratings and feedback in a multi-column responsive grid.
- Includes a **Write a Review** floating CTA triggering a review modal with star selection, category tags, and client info.

### 6. Travel Blog Page (`BlogPage`)
- A detailed feed of tourism guides and traveling tips.
- Category filters (e.g., *Pilgrimage, Beach, Travel Tips*) and live search keywords matching titles or excerpt contents.

### 7. Contact Us Form
- Two-column layout presenting address card information with direct support call triggers and active business hours on the left.
- A clean digital inquiry form on the right capturing customer name, email, phone, and detailed messages.

### 8. Portal & Dashboard Specifications
- **Customer Portal & Dashboard:** Accessible upon customer login. Provides a dedicated booking history table displaying route coordinates, pickup schedules, status states (Enquiry, Confirmed, Ongoing, Completed, Cancelled), and links to request support or cancel bookings.
- **Owner / Admin Dashboard:** Booking requests board (confirm, edit, fare overrides), active fleet manager (add/edit vehicles, KM rates), driver directory (profiles, license data, vehicle bindings), and monthly business analytics charts.
- **Driver Chauffeur Panel:** Lightweight mobile-first checklist interface display showing daily assigned pickups, customer details, and buttons to transition active statuses (Start Trip → Arrived → Completed).

---

## 🗃️ Database Schema Blueprint (`database.sql`)

```sql
-- Users & Roles Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100) UNIQUE,
  role VARCHAR(20) DEFAULT 'customer', -- 'customer', 'driver', 'admin'
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicles Table
CREATE TABLE vehicles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'Bus', 'SUV', 'Hatchback', 'Sedan'
  ac_flag BOOLEAN DEFAULT TRUE,
  seats INT NOT NULL,
  bag_capacity INT DEFAULT 4,
  rate_per_km DECIMAL(10,2) NOT NULL,
  photo_url VARCHAR(255),
  status VARCHAR(20) DEFAULT 'available' -- 'available', 'maintenance', 'rented'
);

-- Driver Profiles Table
CREATE TABLE drivers (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  license_no VARCHAR(50) NOT NULL,
  assigned_vehicle_id INT REFERENCES vehicles(id) ON DELETE SET NULL,
  phone VARCHAR(20) NOT NULL
);

-- Trips & Bookings Core Table
CREATE TABLE trips (
  id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES users(id),
  vehicle_id INT REFERENCES vehicles(id),
  driver_id INT REFERENCES drivers(id),
  pickup_location TEXT NOT NULL,
  destinations JSONB NOT NULL, -- Supporting multi-stop routes
  trip_type VARCHAR(50) NOT NULL, -- 'one-way', 'round-trip', 'local'
  days INT DEFAULT 1,
  km_per_day INT DEFAULT 300,
  rate_per_km DECIMAL(10,2),
  pickup_datetime TIMESTAMP NOT NULL,
  return_datetime TIMESTAMP,
  passengers INT DEFAULT 1,
  bags INT DEFAULT 0,
  hotel_included BOOLEAN DEFAULT FALSE,
  meals_included BOOLEAN DEFAULT FALSE,
  estimated_fare DECIMAL(10,2),
  advance_paid DECIMAL(10,2) DEFAULT 0.00,
  status VARCHAR(50) DEFAULT 'enquiry', -- 'enquiry', 'confirmed', 'ongoing', 'completed', 'cancelled'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Setup & Local Execution Guide

### Prerequisite Checklist
- **Node.js:** Ensure Node v18+ is installed.
- **PostgreSQL:** Ensure local PostgreSQL is running and a database named `pooja_travels` is created.

### 1. Database Setup
Connect to PostgreSQL and run the DDL schema file:
```bash
psql -U postgres -d pooja_travels -f server/database.sql
```

### 2. Backend Server Setup
Navigate into the `server/` directory and install dependencies:
```bash
cd server
npm install
```
Create a `.env` configuration file inside the `server/` directory. You can set it up using either of the following two formats:

**Option A (Single Connection String):**
```env
PORT=5000
DATABASE_URL=postgres://postgres:YOUR_POSTGRES_PASSWORD@localhost:5432/pooja_travels
JWT_SECRET=pooja_travels_super_secure_key
```

**Option B (Individual Variables - Recommended):**
```env
PORT=5000
DB_USER=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pooja_travels
JWT_SECRET=pooja_travels_super_secure_key
```
*(Make sure to replace `YOUR_POSTGRES_PASSWORD` with your actual local PostgreSQL user password).*

#### ⚠️ Database Troubleshooting
If you run `npm run dev` and see the warning:
> `⚠️ PostgreSQL connection failed. Falling back to File-based Mock Database (mock_db.json).`

Ensure that:
1. PostgreSQL is installed and running locally on port `5432`.
2. You have created a database named `pooja_travels` (or the name matches your `.env`).
3. Your database username and password in the `.env` file are correct.
4. You have run the SQL tables queries from `server/database.sql` to initialize the database tables.

Once connection details are set up correctly, restart the server and it will connect successfully.

Start the backend API server:
```bash
npm run dev
```

### 3. Frontend Client Setup
Open a separate terminal window, navigate to `client/`, and install client packages:
```bash
cd client
npm install
```
Start the local Vite compiler server:
```bash
npm run dev
```
Open your browser and navigate to **`http://localhost:5173`** to access the system.

---

## 🔒 Security & Data Best Practices
1. **Password Safety:** All user credentials are encrypted via blowfish bcrypt algorithms before being stored in the database.
2. **State Protection:** All state modifications on subpages are transient and compile cleanly.
3. **Responsive Assets:** Static files are converted to high-performance formats (WebP/AVIF) and optimized for low bandwidth networks.
