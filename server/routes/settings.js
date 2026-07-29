const express = require('express');
const router = express.Router();
const db = require('../db');

// @route   GET api/settings
// @desc    Get all settings
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM site_settings');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching site settings' });
  }
});

// @route   PUT api/settings
// @desc    Update multiple settings keys in a batch
router.put('/', async (req, res) => {
  const settings = req.body; // Expecting key-value object { contact_email: 'x', ... }

  try {
    for (const [key, value] of Object.entries(settings)) {
      await db.query('UPDATE site_settings SET value = $1 WHERE key = $2', [value, key]);
    }
    const result = await db.query('SELECT * FROM site_settings');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating site settings' });
  }
});

module.exports = router;
