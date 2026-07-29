const express = require('express');
const router = express.Router();
const db = require('../db');

// @route   GET api/blogs
// @desc    Get all blogs
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM blogs ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching blogs' });
  }
});

// @route   POST api/blogs
// @desc    Create a new blog
router.post('/', async (req, res) => {
  const { title, excerpt, content, category, date, read_time, image, image2, image3 } = req.body;

  if (!title || !content || !category) {
    return res.status(400).json({ message: 'Missing required blog fields' });
  }

  try {
    const result = await db.query(
      'INSERT INTO blogs (title, excerpt, content, category, date, read_time, image, image2, image3) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [
        title,
        excerpt || '',
        content,
        category,
        date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        read_time || '3 mins read',
        image || '/mahabaleshwar.jpg',
        image2 || null,
        image3 || null
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating blog' });
  }
});

// @route   DELETE api/blogs/:id
// @desc    Delete a blog post
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM blogs WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json({ message: 'Blog post deleted successfully', blog: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting blog' });
  }
});

module.exports = router;
