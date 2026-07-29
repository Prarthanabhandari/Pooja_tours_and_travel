const express = require('express');
const router = express.Router();
const db = require('../db');

// @route   GET api/cabs
// @desc    Get all cab fleet details
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM cabs ORDER BY price_per_km ASC', []);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching cabs' });
  }
});

// @route   POST api/cabs/estimate
// @desc    Calculate cab booking fare estimates
router.post('/estimate', async (req, res) => {
  const { from, to, type } = req.body;

  if (!from || !to || !type) {
    return res.status(400).json({ message: 'From, To, and Cab Type are required' });
  }

  try {
    // Get cab details
    const cabResult = await db.query('SELECT * FROM cabs WHERE type = $1', [type]);
    if (cabResult.rows.length === 0) {
      return res.status(404).json({ message: 'Cab type not found' });
    }

    const cab = cabResult.rows[0];

    // Simulate distance calculation.
    // In a real app, use Google Maps Distance Matrix API.
    // For demo/reference, assign approximate distances for common pairs:
    let distance = 150; // default (e.g. Pune to Mumbai is ~150km)
    
    const routeKey = `${from.toLowerCase()}_${to.toLowerCase()}`;
    if (routeKey.includes('pune') && routeKey.includes('mumbai')) {
      distance = 150;
    } else if (routeKey.includes('pune') && routeKey.includes('shirdi')) {
      distance = 185;
    } else if (routeKey.includes('pune') && routeKey.includes('mahabaleshwar')) {
      distance = 120;
    } else if (routeKey.includes('pune') && routeKey.includes('nashik')) {
      distance = 210;
    } else if (routeKey.includes('pune') && routeKey.includes('alibaug')) {
      distance = 145;
    } else if (routeKey.includes('pune') && routeKey.includes('bhimashankar')) {
      distance = 110;
    }

    // Driver allowance (e.g., ₹250 as seen in reference variables: default_allowance = '250.00')
    const driverAllowance = 250;
    const fare = (distance * cab.price_per_km) + driverAllowance;

    res.json({
      from,
      to,
      cab_type: cab.type,
      cab_name: cab.name,
      distance_km: distance,
      price_per_km: cab.price_per_km,
      driver_allowance: driverAllowance,
      estimated_fare: fare
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error calculating cab estimate' });
  }
});

// @route   PUT api/cabs/price/:id
// @desc    Update cab price_per_km (Admin)
router.put('/price/:id', async (req, res) => {
  const cabId = req.params.id;
  const { price_per_km } = req.body;
  try {
    const result = await db.query(
      'UPDATE cabs SET price_per_km = $1 WHERE id = $2 RETURNING *',
      [price_per_km, cabId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Cab not found' });
    }
    res.json({ message: 'Cab pricing updated successfully', cab: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating cab pricing' });
  }
});

// @route   POST api/cabs
// @desc    Add a new cab to the fleet (Admin)
router.post('/', async (req, res) => {
  const { 
    type, 
    name, 
    price_per_km, 
    seating_capacity, 
    image_url, 
    bags, 
    ac, 
    description, 
    inclusions, 
    exclusions 
  } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO cabs (type, name, price_per_km, seating_capacity, image_url, bags, ac, description, inclusions, exclusions) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        type, 
        name, 
        price_per_km, 
        seating_capacity, 
        image_url || 'hatchback.png', 
        bags || '2 Bags', 
        ac || 'AC Cabin', 
        description || '', 
        inclusions || ['Fuel Charges', 'Toll Charges', 'Driver Allowance'], 
        exclusions || ['State Permit (if any)', 'Parking Fees', 'Extra Hours / KM']
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error adding new cab' });
  }
});

// @route   DELETE api/cabs/:id
// @desc    Delete a cab from the fleet (Admin)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM cabs WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Cab not found' });
    }
    res.json({ message: 'Cab deleted successfully', cab: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting cab' });
  }
});

module.exports = router;
