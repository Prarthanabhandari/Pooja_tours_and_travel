const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const isProduction = process.env.NODE_ENV === 'production';

// Configuration details
const dbConfig = {
  connectionString: process.env.DATABASE_URL || `postgresql://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASSWORD || 'postgres'}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'pooja_travels'}`,
  ssl: isProduction ? { rejectUnauthorized: false } : false
};

let pool = null;
let useMockDb = false;

// Path for local file-based mock database fallback
const mockDbPath = path.join(__dirname, 'mock_db.json');

// Initialize Mock DB file if it doesn't exist
const initializeMockDb = () => {
  if (!fs.existsSync(mockDbPath)) {
    const initialData = {
      users: [
        { id: 1, name: "Test User", email: "test@example.com", password: "password123", phone: "9876543210", role: "user" },
        { id: 2, name: "Ajay Bhandari", email: "booking.poojatravel@gmail.com", password: "Pooja@1111", phone: "9623324139", role: "admin" }
      ],
      cabs: [
        { id: 1, type: "Hatchback", name: "Maruti Suzuki WagonR", price_per_km: 13.00, seating_capacity: 4, image_url: "hatchback.png" },
        { id: 2, type: "SUV", name: "Maruti Suzuki Brezza", price_per_km: 13.00, seating_capacity: 4, image_url: "brezza.png" },
        { id: 3, type: "Sedan", name: "Maruti Suzuki Dzire", price_per_km: 13.00, seating_capacity: 4, image_url: "dzire.png" },
        { id: 4, type: "Comfort Sedan", name: "Toyota Etios", price_per_km: 13.00, seating_capacity: 4, image_url: "etios.png" },
        { id: 5, type: "Family MUV", name: "Maruti Ertiga", price_per_km: 16.00, seating_capacity: 7, image_url: "ertiga.png" },
        { id: 6, type: "Comfort SUV", name: "Kia Carens", price_per_km: 16.00, seating_capacity: 7, image_url: "carens.png" },
        { id: 7, type: "Comfort MUV", name: "Toyota Innova Crysta", price_per_km: 21.00, seating_capacity: 7, image_url: "innova.png" },
        { id: 8, type: "AC Tourist Coach", name: "17-Seater Premium AC Tempo Traveller", price_per_km: 26.00, seating_capacity: 17, image_url: "traveller.png" },
        { id: 9, type: "Standard Coach", name: "17-Seater Standard Non-AC Tempo Traveller", price_per_km: 24.00, seating_capacity: 17, image_url: "traveller.png" },
        { id: 10, type: "Standard Coach", name: "20-Seater Standard Non-AC Tempo Traveller", price_per_km: 26.00, seating_capacity: 20, image_url: "traveller.png" },
        { id: 11, type: "Tourist Coach", name: "32-Seater Comfort Tourist Coach", price_per_km: 35.00, seating_capacity: 32, image_url: "bus.png" },
        { id: 12, type: "Tourist Bus", name: "50-Seater Comfort Tourist Bus", price_per_km: 48.00, seating_capacity: 50, image_url: "bus.png" }
      ],
      buses: [
        { id: 1, name: "Pooja Travels Luxury Coach 1", type: "17-Seater AC Luxury", total_seats: 17, price_per_seat: 750.00, departure_time: "06:00:00", arrival_time: "10:00:00", route_from: "Pune, Maharashtra, India", route_to: "Mumbai, Maharashtra, India" },
        { id: 2, name: "Pooja Travels Luxury Coach 2", type: "17-Seater AC Luxury", total_seats: 17, price_per_seat: 600.00, departure_time: "07:30:00", arrival_time: "11:30:00", route_from: "Pune, Maharashtra, India", route_to: "Mahabaleshwar, Maharashtra, India" },
        { id: 3, name: "Pooja Travels Luxury Coach 3", type: "17-Seater AC Luxury", total_seats: 17, price_per_seat: 700.00, departure_time: "08:00:00", arrival_time: "13:30:00", route_from: "Pune, Maharashtra, India", route_to: "Shirdi, Maharashtra, India" }
      ],
      bookings: [],
      contact_messages: [],
      site_settings: [
        { id: 1, key: "contact_email", value: "booking.poojatravel@gmail.com", category: "contact", description: "Primary contact email address for reservations and support" },
        { id: 2, key: "contact_phone", value: "+919623324139", category: "contact", description: "Primary business mobile number" },
        { id: 3, key: "contact_phone_alt", value: "+917387129287", category: "contact", description: "Alternative backup mobile number" },
        { id: 4, key: "hero_title", value: "Explore Maharashtra with Pooja Tours & Travels", category: "content", description: "Headline text displayed in the home page hero section" },
        { id: 5, key: "hero_subtitle", value: "Premium Chauffeur Cabs & AC Bus Rentals out of Pune. Low price guarantee, transparent pricing.", category: "content", description: "Subheadline text displayed under the main hero title" },
        { id: 6, key: "about_text", value: "Pooja Tours and Travels is a leading travel operator based in Pune, offering outstation chauffeur cabs and luxury bus rental solutions. We pride ourselves on punctuality, safety, and excellent service quality.", category: "content", description: "Short company introduction paragraph displayed in About and Footer" }
      ],
      blogs: [
        {
          id: 1,
          title: "Top 5 Places to Visit in Mahabaleshwar During Monsoon",
          excerpt: "Discover the lush green valleys, strawberry farms, and waterfalls of Mahabaleshwar that come alive during the monsoon season.",
          content: "Mahabaleshwar is Maharashtra's ultimate monsoon getaway...",
          category: "travel",
          date: "July 12, 2026",
          read_time: "4 mins read",
          image: "/mahabaleshwar.jpg"
        }
      ],
      gallery: [
        { id: 1, title: "Luxury 17-Seater Force Traveller AC Coach", image: "/Gallery/WhatsApp Image 2026-07-06 at 9.06.50 PM.jpeg", category: "tours", likes: 184 },
        { id: 2, title: "Happy family trip next to Force Traveller", image: "/Gallery/WhatsApp Image 2026-07-07 at 11.16.19 AM.jpeg", category: "tours", likes: 215 },
        { id: 3, title: "Pooja Travels Fleet Lineup (Coaches & Cabs)", image: "/Gallery/WhatsApp Image 2026-07-07 at 11.16.39 AM.jpeg", category: "fleet", likes: 198 }
      ]
    };
    fs.writeFileSync(mockDbPath, JSON.stringify(initialData, null, 2), 'utf-8');
  }
};

const getMockData = () => {
  initializeMockDb();
  return JSON.parse(fs.readFileSync(mockDbPath, 'utf-8'));
};

const saveMockData = (data) => {
  fs.writeFileSync(mockDbPath, JSON.stringify(data, null, 2), 'utf-8');
};

// Test PG database connection
try {
  pool = new Pool(dbConfig);
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.warn('⚠️  PostgreSQL connection failed. Falling back to File-based Mock Database (mock_db.json).');
      console.warn('   Ensure PostgreSQL is running and DB_USER/DB_PASSWORD env vars are set correctly if you wish to use PostgreSQL.');
      useMockDb = true;
    } else {
      console.log('✅  PostgreSQL connected successfully:', res.rows[0].now);
    }
  });
} catch (e) {
  console.warn('⚠️  PostgreSQL initialization failed. Falling back to File-based Mock DB.');
  useMockDb = true;
}

// Custom Query Wrapper
const query = async (text, params) => {
  if (useMockDb) {
    return handleMockQuery(text, params);
  }
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (err) {
    console.error('Database query error:', err.message);
    throw err;
  }
};

// Mock Query Resolver for typical CRUD queries
const handleMockQuery = (text, params = []) => {
  console.log(`[MOCK DB QUERY]: ${text.substring(0, 100)}... Params:`, params);
  const data = getMockData();
  const normalizedText = text.replace(/\s+/g, ' ').trim().toLowerCase();

  // 1. Get all Cabs
  if (normalizedText.includes('select * from cabs') || normalizedText.includes('select*from cabs')) {
    return { rows: data.cabs };
  }

  // 2. Get Buses matching routes
  if (normalizedText.includes('select * from buses') && normalizedText.includes('route_from') && normalizedText.includes('route_to')) {
    const fromVal = params[0]?.toLowerCase().trim();
    const toVal = params[1]?.toLowerCase().trim();
    const filteredBuses = data.buses.filter(b => 
      b.route_from.toLowerCase().includes(fromVal) && b.route_to.toLowerCase().includes(toVal)
    );
    return { rows: filteredBuses };
  }

  // 3. User Register & Login check
  if (normalizedText.includes('select * from users') && normalizedText.includes('email = $1')) {
    const emailVal = params[0]?.toLowerCase().trim();
    const user = data.users.find(u => u.email.toLowerCase() === emailVal);
    return { rows: user ? [user] : [] };
  }

  if (normalizedText.includes('insert into users')) {
    // INSERT INTO users (name, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING *
    const newUser = {
      id: data.users.length + 1,
      name: params[0],
      email: params[1],
      password: params[2],
      phone: params[3],
      role: 'user',
      created_at: new Date().toISOString()
    };
    data.users.push(newUser);
    saveMockData(data);
    return { rows: [newUser] };
  }

  // 4. Booking operations
  if (normalizedText.includes('insert into bookings')) {
    // params: user_id, booking_type, cab_id, bus_id, route_from, route_to, travel_date, departure_time, amount, status, seats_selected, passenger_details
    // INSERT INTO bookings (user_id, booking_type, cab_id, bus_id, route_from, route_to, travel_date, departure_time, amount, seats_selected, passenger_details) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *
    const newBooking = {
      id: data.bookings.length + 1,
      user_id: params[0] || null,
      booking_type: params[1],
      cab_id: params[2] || null,
      bus_id: params[3] || null,
      route_from: params[4],
      route_to: params[5],
      travel_date: params[6],
      departure_time: params[7],
      amount: parseFloat(params[8]),
      status: 'confirmed',
      seats_selected: params[9] || null,
      passenger_details: typeof params[10] === 'string' ? JSON.parse(params[10]) : params[10],
      created_at: new Date().toISOString()
    };
    data.bookings.push(newBooking);
    saveMockData(data);
    return { rows: [newBooking] };
  }

  if (normalizedText.includes('select * from bookings') || normalizedText.includes('select b.*')) {
    // Return all bookings with optional join data for preview
    // To keep simple, return booking rows and attach vehicle/bus names
    const enrichedBookings = data.bookings.map(b => {
      let vehicle_name = '';
      if (b.booking_type === 'bus') {
        const bus = data.buses.find(busItem => busItem.id === b.bus_id);
        vehicle_name = bus ? `${bus.name} (${bus.type})` : 'Pooja Travels Bus';
      } else {
        const cab = data.cabs.find(cabItem => cabItem.id === b.cab_id);
        vehicle_name = cab ? `${cab.name} (${cab.type})` : 'Pooja Travels Cab';
      }
      return { ...b, vehicle_name };
    });
    
    if (normalizedText.includes('user_id = $1')) {
      const userId = params[0];
      const userBookings = enrichedBookings.filter(b => b.user_id === userId || !b.user_id); // Return guest bookings as well for preview simplicity
      return { rows: userBookings };
    }
    return { rows: enrichedBookings };
  }

  if (normalizedText.includes('update bookings set status = $1 where id = $2') || normalizedText.includes('status = \'cancelled\'')) {
    const statusVal = params[1] ? params[0] : 'cancelled';
    const bookingId = params[1] || params[0];
    const index = data.bookings.findIndex(b => b.id === parseInt(bookingId));
    if (index !== -1) {
      data.bookings[index].status = statusVal;
      saveMockData(data);
      return { rows: [data.bookings[index]] };
    }
    return { rows: [] };
  }

  // 5. Contact message
  if (normalizedText.includes('insert into contact_messages')) {
    const newMessage = {
      id: data.contact_messages.length + 1,
      name: params[0],
      email: params[1],
      phone: params[2],
      message: params[3],
      created_at: new Date().toISOString()
    };
    data.contact_messages.push(newMessage);
    saveMockData(data);
    return { rows: [newMessage] };
  }

  // 6. Get all contact messages
  if (normalizedText.includes('select * from contact_messages')) {
    return { rows: data.contact_messages || [] };
  }

  // 7. Get all users
  if (normalizedText.includes('select * from users') && !normalizedText.includes('email = $1')) {
    return { rows: data.users || [] };
  }

  // 8. Update Cab Price
  if (normalizedText.includes('update cabs set price_per_km = $1 where id = $2')) {
    const priceVal = parseFloat(params[0]);
    const cabId = parseInt(params[1]);
    const index = data.cabs.findIndex(c => c.id === cabId);
    if (index !== -1) {
      data.cabs[index].price_per_km = priceVal;
      saveMockData(data);
      return { rows: [data.cabs[index]] };
    }
    return { rows: [] };
  }

  // 9. Update Bus Price
  if (normalizedText.includes('update buses set price_per_seat = $1 where id = $2')) {
    const priceVal = parseFloat(params[0]);
    const busId = parseInt(params[1]);
    const index = data.buses.findIndex(b => b.id === busId);
    if (index !== -1) {
      data.buses[index].price_per_seat = priceVal;
      saveMockData(data);
      return { rows: [data.buses[index]] };
    }
    return { rows: [] };
  }

  // 10. Add New Cab
  if (normalizedText.includes('insert into cabs')) {
    const newCab = {
      id: data.cabs.length + 1,
      type: params[0],
      name: params[1],
      price_per_km: parseFloat(params[2]),
      seating_capacity: parseInt(params[3]),
      image_url: params[4] || 'hatchback.png'
    };
    data.cabs.push(newCab);
    saveMockData(data);
    return { rows: [newCab] };
  }

  // 11. Add New Bus
  if (normalizedText.includes('insert into buses')) {
    const newBus = {
      id: data.buses.length + 1,
      name: params[0],
      type: params[1],
      total_seats: parseInt(params[2]),
      price_per_seat: parseFloat(params[3]),
      departure_time: params[4],
      arrival_time: params[5],
      route_from: params[6],
      route_to: params[7]
    };
    data.buses.push(newBus);
    saveMockData(data);
    return { rows: [newBus] };
  }

  // 12. Site Settings queries
  if (normalizedText.includes('select * from site_settings') || normalizedText.includes('select*from site_settings')) {
    return { rows: data.site_settings || [] };
  }

  if (normalizedText.includes('update site_settings set value = $1 where key = $2') || normalizedText.includes('update site_settings')) {
    const val = params[0];
    const keyName = params[1];
    const idx = data.site_settings.findIndex(s => s.key === keyName);
    if (idx !== -1) {
      data.site_settings[idx].value = val;
      saveMockData(data);
      return { rows: [data.site_settings[idx]] };
    }
    return { rows: [] };
  }

  // 13. Blogs queries
  if (normalizedText.includes('select * from blogs') || normalizedText.includes('select*from blogs')) {
    return { rows: data.blogs || [] };
  }

  if (normalizedText.includes('insert into blogs')) {
    const newBlog = {
      id: data.blogs.length + 1,
      title: params[0],
      excerpt: params[1],
      content: params[2],
      category: params[3],
      date: params[4] || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      read_time: params[5] || '3 mins read',
      image: params[6] || '/mahabaleshwar.jpg',
      created_at: new Date().toISOString()
    };
    data.blogs.push(newBlog);
    saveMockData(data);
    return { rows: [newBlog] };
  }

  if (normalizedText.includes('delete from blogs where id = $1')) {
    const blogId = parseInt(params[0]);
    data.blogs = data.blogs.filter(b => b.id !== blogId);
    saveMockData(data);
    return { rows: [{ id: blogId }] };
  }

  // 14. Gallery queries
  if (normalizedText.includes('select * from gallery') || normalizedText.includes('select*from gallery')) {
    return { rows: data.gallery || [] };
  }

  if (normalizedText.includes('insert into gallery')) {
    const newImg = {
      id: data.gallery.length + 1,
      title: params[0],
      image: params[1],
      category: params[2],
      likes: parseInt(params[3] || '0'),
      created_at: new Date().toISOString()
    };
    data.gallery.push(newImg);
    saveMockData(data);
    return { rows: [newImg] };
  }

  if (normalizedText.includes('delete from gallery where id = $1')) {
    const imgId = parseInt(params[0]);
    data.gallery = data.gallery.filter(g => g.id !== imgId);
    saveMockData(data);
    return { rows: [{ id: imgId }] };
  }

  return { rows: [] };
};

module.exports = {
  query,
  pool,
  getUseMockDb: () => useMockDb
};
