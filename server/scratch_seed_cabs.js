const db = require('./db');

const initialCabs = [
  { type: "Hatchback", name: "Maruti Suzuki WagonR", price_per_km: 13.00, seating_capacity: 4, image_url: "hatchback.png" },
  { type: "SUV", name: "Maruti Suzuki Brezza", price_per_km: 13.00, seating_capacity: 4, image_url: "brezza.png" },
  { type: "Sedan", name: "Maruti Suzuki Dzire", price_per_km: 13.00, seating_capacity: 4, image_url: "dzire.png" },
  { type: "Comfort Sedan", name: "Toyota Etios", price_per_km: 13.00, seating_capacity: 4, image_url: "etios.png" },
  { type: "Family MUV", name: "Maruti Ertiga", price_per_km: 16.00, seating_capacity: 7, image_url: "ertiga.png" },
  { type: "Comfort SUV", name: "Kia Carens", price_per_km: 16.00, seating_capacity: 7, image_url: "carens.png" },
  { type: "Comfort MUV", name: "Toyota Innova Crysta", price_per_km: 21.00, seating_capacity: 7, image_url: "innova.png" },
  { type: "AC Tourist Coach", name: "17-Seater Premium AC Tempo Traveller", price_per_km: 26.00, seating_capacity: 17, image_url: "traveller.png" },
  { type: "Standard Coach", name: "17-Seater Standard Non-AC Tempo Traveller", price_per_km: 24.00, seating_capacity: 17, image_url: "traveller.png" },
  { type: "Standard Coach", name: "20-Seater Standard Non-AC Tempo Traveller", price_per_km: 26.00, seating_capacity: 20, image_url: "traveller.png" },
  { type: "Tourist Coach", name: "32-Seater Comfort Tourist Coach", price_per_km: 35.00, seating_capacity: 32, image_url: "bus.png" },
  { type: "Tourist Bus", name: "50-Seater Comfort Tourist Bus", price_per_km: 48.00, seating_capacity: 50, image_url: "bus.png" }
];

async function seed() {
  try {
    console.log('Seeding Cabs Table with exact rates...');
    
    // Clear old cabs and reset sequence
    await db.query('TRUNCATE TABLE cabs RESTART IDENTITY CASCADE');
    console.log('Cleared existing cabs and reset ID sequence.');

    // Insert new cabs
    for (const cab of initialCabs) {
      await db.query(
        'INSERT INTO cabs (type, name, price_per_km, seating_capacity, image_url) VALUES ($1, $2, $3, $4, $5)',
        [cab.type, cab.name, cab.price_per_km, cab.seating_capacity, cab.image_url]
      );
      console.log(`Inserted: ${cab.name} (${cab.price_per_km} rs/km)`);
    }

    console.log('Seeding completed successfully!');
  } catch (err) {
    console.error('Error seeding cabs:', err);
  }
  process.exit(0);
}

seed();
