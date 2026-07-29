const db = require('./db');

async function seedAdmin() {
  try {
    // Check if admin exists
    const res = await db.query('SELECT * FROM users WHERE email = $1', ['booking.poojatravel@gmail.com']);
    if (res.rows.length === 0) {
      await db.query(
        "INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5)",
        ['Ajay Bhandari', 'booking.poojatravel@gmail.com', 'Pooja@1111', '9623324139', 'admin']
      );
      console.log('✅ Admin user successfully seeded in PostgreSQL database.');
    } else {
      await db.query(
        "UPDATE users SET name = $1, password = $2, phone = $3 WHERE email = $4",
        ['Ajay Bhandari', 'Pooja@1111', '9623324139', 'booking.poojatravel@gmail.com']
      );
      console.log('✅ Admin info updated to Ajay Bhandari / 9623324139 in PostgreSQL database.');
    }
  } catch (err) {
    console.error('❌ Failed to seed admin user in PostgreSQL:', err);
  } finally {
    if (db.pool) {
      await db.pool.end();
    }
    process.exit(0);
  }
}

seedAdmin();
