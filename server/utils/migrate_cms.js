const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || `postgresql://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASSWORD || 'admin'}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'pooja_travels'}`
});

const defaultSettings = [
  { key: 'contact_email', value: 'booking.poojatravel@gmail.com', category: 'contact', description: 'Primary contact email address for reservations and support' },
  { key: 'contact_phone', value: '+919623324139', category: 'contact', description: 'Primary business mobile number' },
  { key: 'contact_phone_alt', value: '+917387129287', category: 'contact', description: 'Alternative backup mobile number' },
  { key: 'hero_title', value: 'Explore Maharashtra with Pooja Tours & Travels', category: 'content', description: 'Headline text displayed in the home page hero section' },
  { key: 'hero_subtitle', value: 'Premium Chauffeur Cabs & AC Bus Rentals out of Pune. Low price guarantee, transparent pricing.', category: 'content', description: 'Subheadline text displayed under the main hero title' },
  { key: 'about_text', value: 'Pooja Tours and Travels is a leading travel operator based in Pune, offering outstation chauffeur cabs and luxury bus rental solutions. We pride ourselves on punctuality, safety, and excellent service quality.', category: 'content', description: 'Short company introduction paragraph displayed in About and Footer' }
];

const defaultBlogs = [
  {
    title: 'Top 5 Places to Visit in Mahabaleshwar During Monsoon',
    excerpt: 'Discover the lush green valleys, strawberry farms, and waterfalls of Mahabaleshwar that come alive during the monsoon season.',
    content: `Mahabaleshwar is Maharashtra's ultimate monsoon getaway. When the rain starts, the entire hill station is covered in misty fog and vibrant green valleys.

Here are the top 5 places you must visit:
1. Arthur's Seat: Known as the queen of points, it offers a majestic view of the Savitri river valley.
2. Lingmala Waterfall: The rainy season makes this waterfall roar with breathtaking natural force.
3. Mapro Garden: Enjoy fresh cream strawberries, warm pizzas, and buy fruit crushes directly from the farm.
4. Venna Lake: Although boating is restricted during heavy rains, walking along the misty lake banks is peaceful.
5. Elephant's Head Point: A scenic rock formation resembling an elephant's head, perfect for photography.

Travel Tip: Roads can get slippery during heavy rains. Booking a professional chauffeur-driven outstation cab from Pooja Travels ensures a safe and comfortable ride so you can enjoy the scenic drive without driving stress.`,
    category: 'travel',
    date: 'July 12, 2026',
    read_time: '4 mins read',
    image: '/mahabaleshwar.jpg'
  },
  {
    title: 'A Spiritual Guide to the Ashtavinayak Yatra',
    excerpt: 'Plan your sacred journey across the 8 self-manifested Ganesha temples of Maharashtra. Here is everything you need to know.',
    content: `The Ashtavinayak Yatra refers to a pilgrimage to the eight temples of Lord Ganesha in Maharashtra. These temples are located around Pune and are considered highly sacred.

The 8 Holy Temples:
1. Mayureshwar (Morgaon) - Usually the starting and ending point.
2. Siddhivinayak (Siddhatek) - The only temple where Ganesha's trunk is turned right.
3. Ballaleshwar (Pali) - Named after a devotee boy, Ballal.
4. Varadavinayak (Mahad) - Features a lamp that has been burning since 1892.
5. Chintamani (Theur) - Associated with Ganesha retrieving a precious gem.
6. Girijatmaj (Lenyadri) - Located in a cave, requires climbing 307 stone steps.
7. Vighneshwar (Ozar) - Known for Ganesha overcoming the demon Vighnasur.
8. Mahaganapati (Ranjangaon) - Highly powerful form of Ganesha.

Planning Tip: The yatra covers a distance of about 650 kilometers. Hiring a comfortable family cab or renting a 17-seater minibus with Pooja Travels makes the 2-day journey pleasant for elderly relatives and kids.`,
    category: 'pilgrimage',
    date: 'July 05, 2026',
    read_time: '6 mins read',
    image: '/ashtavinayak.jpg'
  },
  {
    title: 'Why Renting a 17-Seater Minibus is Perfect for Family Tours',
    excerpt: 'Traveling together makes memories sweeter. Explore why our premium Force Traveller is the preferred choice for family groups.',
    content: `Family tours are beautiful, but coordinating multiple cars can turn into a logistical headache. Fuel costs, parking hassles, and getting separated in traffic are common issues.

Here is why a 17-seater Force Traveller minibus solves these issues:
1. Togetherness: Everyone travels together in one spacious compartment, making room for games, songs, and laughter.
2. Generous Luggage Space: Features a top luggage carrier and spacious rear boot, leaving passenger seats completely clutter-free.
3. Individual AC Vents & Reclining Seats: Keeps everyone comfortable during long summer or humid monsoon trips.
4. Experienced Chauffeur: Professional drivers who handle tricky mountain ghats (like Mahabaleshwar or Lonavala) easily.
5. Flat Rates: Shared expenses mean you pay less per person compared to running three separate cars.

Next time you plan an outstation trip, check out our Pooja Travels actual fleet gallery and make an inquiry for the luxury Force Traveller!`,
    category: 'fleet',
    date: 'June 20, 2026',
    read_time: '3 mins read',
    image: '/bus_front.jpg'
  },
  {
    title: 'Ultimate Goa Road Trip from Pune: Routes & Stopovers',
    excerpt: "From waterfalls to local food stops, here is the perfect guide for a scenic road journey from Pune to Goa's sandy beaches.",
    content: `A road trip from Pune to Goa is a dream journey for travel lovers. The transition from the rugged Western Ghats to the coastal shores is magnificent.

Popular Routes:
1. Via NH 48 (Pune - Kolhapur - Nippani - Amboli Ghat - Goa): The most popular and safest route with excellent four-lane highways and scenic valley views through Amboli Ghat.
2. Via Anmod Ghat (Pune - Belgaum - Anmod Ghat - Goa): Recommended for travellers going to South Goa.

Recommended Stopovers:
- Kolhapur: Stop for a traditional Maharashtrian breakfast or spicy Kolhapuri thali.
- Amboli Waterfall: A refreshing waterfall right on the ghat road side, perfect for taking photos.

Booking Advice: Driving for 10 hours continuously can be exhausting. Hiring a neat, air-conditioned outstation sedan from Pooja Travels allows you to sit back, sleep, and arrive in Goa completely fresh and ready to hit the beaches!`,
    category: 'roadtrips',
    date: 'June 10, 2026',
    read_time: '5 mins read',
    image: '/goa.jpg'
  }
];

const defaultGallery = [
  { title: 'Luxury 17-Seater Force Traveller AC Coach', image: '/Gallery/WhatsApp Image 2026-07-06 at 9.06.50 PM.jpeg', category: 'tours', likes: 184 },
  { title: 'Happy family trip next to Force Traveller', image: '/Gallery/WhatsApp Image 2026-07-07 at 11.16.19 AM.jpeg', category: 'tours', likes: 215 },
  { title: 'Pooja Travels Fleet Lineup (Coaches & Cabs)', image: '/Gallery/WhatsApp Image 2026-07-07 at 11.16.39 AM.jpeg', category: 'fleet', likes: 198 },
  { title: 'Outstation pilgrimage tour group posing', image: '/Gallery/WhatsApp Image 2026-07-07 at 11.16.40 AM (1).jpeg', category: 'tours', likes: 167 },
  { title: 'Pooja Travels Coach (Side Profile)', image: '/Gallery/WhatsApp Image 2026-07-07 at 11.16.40 AM (2).jpeg', category: 'fleet', likes: 124 },
  { title: 'Tour group outstation trip group photo', image: '/Gallery/WhatsApp Image 2026-07-07 at 11.16.40 AM (3).jpeg', category: 'tours', likes: 142 },
  { title: 'Force Traveller Coach standby view', image: '/Gallery/WhatsApp Image 2026-07-07 at 11.16.40 AM.jpeg', category: 'fleet', likes: 135 },
  { title: 'Outstation tour happy group photo', image: '/Gallery/WhatsApp Image 2026-07-09 at 11.44.09 AM.jpeg', category: 'tours', likes: 191 },
  { title: 'Luxury Force Traveller Coach tour stop', image: '/Gallery/WhatsApp Image 2026-07-09 at 11.44.10 AM (1).jpeg', category: 'fleet', likes: 112 },
  { title: 'Chauffeur driven family outstation cab', image: '/Gallery/WhatsApp Image 2026-07-09 at 11.44.10 AM.jpeg', category: 'fleet', likes: 98 },
  { title: 'Corporate outstation tour pickup lineup', image: '/Gallery/WhatsApp Image 2026-07-09 at 11.44.12 AM (1).jpeg', category: 'tours', likes: 147 },
  { title: 'Pooja Travels luxury bus front view', image: '/Gallery/WhatsApp Image 2026-07-09 at 11.44.12 AM (2).jpeg', category: 'fleet', likes: 173 },
  { title: 'Happy passengers outstation group click', image: '/Gallery/WhatsApp Image 2026-07-09 at 11.44.12 AM (3).jpeg', category: 'tours', likes: 156 },
  { title: 'Tourist outstation sightseeing lineup', image: '/Gallery/WhatsApp Image 2026-07-09 at 11.44.12 AM.jpeg', category: 'tours', likes: 129 },
  { title: 'Outstation drops and airport transits', image: '/Gallery/WhatsApp Image 2026-07-09 at 11.44.14 AM (1).jpeg', category: 'fleet', likes: 105 },
  { title: 'Pooja Travels coach preparation and checks', image: '/Gallery/WhatsApp Image 2026-07-09 at 11.44.14 AM.jpeg', category: 'fleet', likes: 118 },
  { title: 'Tourists posing with premium Force Traveller', image: '/Gallery/WhatsApp Image 2026-07-09 at 11.44.15 AM (1).jpeg', category: 'tours', likes: 154 },
  { title: 'Pooja Travels chauffeur posing with outstation cab', image: '/Gallery/WhatsApp Image 2026-07-09 at 11.44.15 AM.jpeg', category: 'fleet', likes: 139 }
];

async function migrate() {
  try {
    console.log('🔄 Connecting to PostgreSQL database...');
    
    // Create tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
          id SERIAL PRIMARY KEY,
          key VARCHAR(100) UNIQUE NOT NULL,
          value TEXT NOT NULL,
          category VARCHAR(50) DEFAULT 'general',
          description TEXT
      );
      
      CREATE TABLE IF NOT EXISTS blogs (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          excerpt TEXT,
          content TEXT NOT NULL,
          category VARCHAR(50) NOT NULL,
          date VARCHAR(50) NOT NULL,
          read_time VARCHAR(50) NOT NULL,
          image TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS gallery (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          image TEXT NOT NULL,
          category VARCHAR(50) NOT NULL,
          likes INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ PostgreSQL schema verified/created successfully.');

    // Seed site_settings
    for (const setting of defaultSettings) {
      const checkSetting = await pool.query('SELECT * FROM site_settings WHERE key = $1', [setting.key]);
      if (checkSetting.rows.length === 0) {
        await pool.query(
          'INSERT INTO site_settings (key, value, category, description) VALUES ($1, $2, $3, $4)',
          [setting.key, setting.value, setting.category, setting.description]
        );
        console.log(` seeded setting key: ${setting.key}`);
      } else {
        await pool.query(
          'UPDATE site_settings SET value = $1 WHERE key = $2',
          [setting.value, setting.key]
        );
        console.log(` updated setting key: ${setting.key}`);
      }
    }

    // Seed blogs
    const checkBlogs = await pool.query('SELECT COUNT(*) FROM blogs');
    if (parseInt(checkBlogs.rows[0].count) === 0) {
      for (const blog of defaultBlogs) {
        await pool.query(
          'INSERT INTO blogs (title, excerpt, content, category, date, read_time, image) VALUES ($1, $2, $3, $4, $5, $6, $7)',
          [blog.title, blog.excerpt, blog.content, blog.category, blog.date, blog.read_time, blog.image]
        );
      }
      console.log('✅ Seeded default travel blogs.');
    }

    // Seed gallery
    const checkGallery = await pool.query('SELECT COUNT(*) FROM gallery');
    if (parseInt(checkGallery.rows[0].count) === 0) {
      for (const item of defaultGallery) {
        await pool.query(
          'INSERT INTO gallery (title, image, category, likes) VALUES ($1, $2, $3, $4)',
          [item.title, item.image, item.category, item.likes]
        );
      }
      console.log('✅ Seeded default gallery image details.');
    }

    console.log('🎉 Migration and seeding completed successfully!');
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
  } finally {
    await pool.end();
  }
}

migrate();
