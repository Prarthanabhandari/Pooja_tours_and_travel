const express = require('express');
const router = express.Router();
const db = require('../db');

const { sendInquiryEmail } = require('../utils/email');

// @route   POST api/contact
// @desc    Submit a contact inquiry form
router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, Email, and Message are required' });
  }

  try {
    const result = await db.query(
      'INSERT INTO contact_messages (name, email, phone, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, phone || '', message]
    );

    const inquiry = result.rows[0];
    sendInquiryEmail(inquiry).catch(err => console.error('Error dispatching inquiry email:', err));

    res.status(201).json({
      message: 'Your inquiry has been submitted successfully. Our team will contact you soon.',
      inquiry: inquiry
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error saving contact message' });
  }
});

// @route   GET api/contact
// @desc    Retrieve all contact inquiries (Admin)
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM contact_messages ORDER BY created_at DESC', []);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error retrieving contact inquiries' });
  }
});

module.exports = router;
