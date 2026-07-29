const express = require('express');
const router = express.Router();
const db = require('../db');
const { sendBookingEmail } = require('../utils/email');

// @route   POST api/bookings
// @desc    Create a new booking (bus or cab)
router.post('/', async (req, res) => {
  const {
    user_id,
    booking_type, // 'bus' or 'cab'
    cab_id,
    bus_id,
    route_from,
    route_to,
    travel_date,
    departure_time,
    amount,
    seats_selected, // Array of strings (for bus)
    passenger_details // Array of passenger objects
  } = req.body;

  if (!booking_type || !route_from || !route_to || !travel_date || !amount || !passenger_details) {
    return res.status(400).json({ message: 'Missing required booking fields' });
  }

  try {
    const result = await db.query(
      `INSERT INTO bookings 
      (user_id, booking_type, cab_id, bus_id, route_from, route_to, travel_date, departure_time, amount, seats_selected, passenger_details) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
      RETURNING *`,
      [
        user_id || null,
        booking_type,
        cab_id || null,
        bus_id || null,
        route_from,
        route_to,
        travel_date,
        departure_time || null,
        amount,
        seats_selected || null,
        JSON.stringify(passenger_details)
      ]
    );

    const booking = result.rows[0];
    
    // Fetch vehicle name if applicable for cleaner receipt details
    if (booking.booking_type === 'cab' && booking.cab_id) {
      const cabRes = await db.query('SELECT name, type FROM cabs WHERE id = $1', [booking.cab_id]);
      if (cabRes.rows && cabRes.rows.length > 0) {
        booking.vehicle_name = `${cabRes.rows[0].name} (${cabRes.rows[0].type})`;
      }
    } else if (booking.booking_type === 'bus' && booking.bus_id) {
      const busRes = await db.query('SELECT name FROM buses WHERE id = $1', [booking.bus_id]);
      if (busRes.rows && busRes.rows.length > 0) {
        booking.vehicle_name = busRes.rows[0].name;
      }
    }

    // Trigger async email dispatch
    sendBookingEmail(booking).catch(err => console.error('Error dispatching booking email:', err));

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating booking' });
  }
});

// @route   GET api/bookings/user/:id
// @desc    Get bookings for a specific user
router.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    // Standard query (If PG is used, we join, but the mock DB connector handles enriching b.* with names automatically)
    let queryText = '';
    if (db.getUseMockDb()) {
      queryText = 'SELECT * FROM bookings WHERE user_id = $1';
    } else {
      queryText = `
        SELECT b.*, 
          COALESCE(c.name, bu.name) as vehicle_name
        FROM bookings b
        LEFT JOIN cabs c ON b.cab_id = c.id
        LEFT JOIN buses bu ON b.bus_id = bu.id
        WHERE b.user_id = $1
        ORDER BY b.created_at DESC
      `;
    }

    const result = await db.query(queryText, [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error retrieving user bookings' });
  }
});

// @route   GET api/bookings
// @desc    Get all bookings (Admin check)
router.get('/', async (req, res) => {
  try {
    let queryText = '';
    if (db.getUseMockDb()) {
      queryText = 'SELECT * FROM bookings';
    } else {
      queryText = `
        SELECT b.*, 
          COALESCE(c.name, bu.name) as vehicle_name
        FROM bookings b
        LEFT JOIN cabs c ON b.cab_id = c.id
        LEFT JOIN buses bu ON b.bus_id = bu.id
        ORDER BY b.created_at DESC
      `;
    }

    const result = await db.query(queryText, []);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error retrieving bookings' });
  }
});

// @route   PUT api/bookings/cancel/:id
// @route   PUT api/bookings/cancel/:id
// @desc    Cancel an existing booking
router.put('/cancel/:id', async (req, res) => {
  const bookingId = req.params.id;
  try {
    const result = await db.query(
      `UPDATE bookings SET status = 'cancelled' WHERE id = $1 RETURNING *`,
      [bookingId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking cancelled successfully', booking: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error cancelling booking' });
  }
});

// @route   PUT api/bookings/status/:id
// @desc    Update status of booking (Admin)
router.put('/status/:id', async (req, res) => {
  const bookingId = req.params.id;
  const { status } = req.body;
  try {
    const result = await db.query(
      `UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *`,
      [status, bookingId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking status updated successfully', booking: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating booking status' });
  }
});

module.exports = router;
