const express = require('express');
const router = express.Router();
const db = require('../db');

// @route   GET api/buses/search
// @desc    Search for buses matching routes
router.get('/search', async (req, res) => {
  const { from, to, date } = req.query;

  if (!from || !to) {
    return res.status(400).json({ message: 'From and To locations are required' });
  }

  try {
    // Perform lookup
    const result = await db.query(
      'SELECT * FROM buses WHERE route_from = $1 AND route_to = $2',
      [from, to]
    );

    // If query returned rows, return them, else return a list of general buses to make UI look good
    if (result.rows.length > 0) {
      return res.json(result.rows);
    }

    // Fallback: If no direct route matches in postgres, return mock query list
    const fallbackResult = await db.query('SELECT * FROM buses', []);
    const matchingFallbacks = fallbackResult.rows.filter(bus => 
      bus.route_from.toLowerCase().includes(from.toLowerCase()) && 
      bus.route_to.toLowerCase().includes(to.toLowerCase())
    );

    res.json(matchingFallbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error searching buses' });
  }
});

// @route   GET api/buses
// @desc    Get all buses
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM buses', []);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching buses' });
  }
});

// @route   PUT api/buses/price/:id
// @desc    Update bus price_per_seat (Admin)
router.put('/price/:id', async (req, res) => {
  const busId = req.params.id;
  const { price_per_seat } = req.body;
  try {
    const result = await db.query(
      'UPDATE buses SET price_per_seat = $1 WHERE id = $2 RETURNING *',
      [price_per_seat, busId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.json({ message: 'Bus seat pricing updated successfully', bus: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating bus pricing' });
  }
});

// @route   POST api/buses
// @desc    Add a new bus to the fleet (Admin)
router.post('/', async (req, res) => {
  const { name, type, total_seats, price_per_seat, departure_time, arrival_time, route_from, route_to } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO buses (name, type, total_seats, price_per_seat, departure_time, arrival_time, route_from, route_to) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [name, type, total_seats || 17, price_per_seat, departure_time, arrival_time, route_from, route_to]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error adding new bus' });
  }
});

// @route   DELETE api/buses/:id
// @desc    Delete a bus route from the fleet (Admin)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM buses WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.json({ message: 'Bus deleted successfully', bus: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting bus' });
  }
});

module.exports = router;
