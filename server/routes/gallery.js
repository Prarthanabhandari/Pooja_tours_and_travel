const express = require('express');
const router = express.Router();
const db = require('../db');

// @route   GET api/gallery
// @desc    Get all gallery images
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM gallery ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching gallery images' });
  }
});

// @route   POST api/gallery
// @desc    Add a new gallery image
router.post('/', async (req, res) => {
  const { title, image, category } = req.body;

  if (!title || !image || !category) {
    return res.status(400).json({ message: 'Missing required gallery fields' });
  }

  try {
    const result = await db.query(
      'INSERT INTO gallery (title, image, category, likes) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, image, category, 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error adding gallery image' });
  }
});

// @route   PUT api/gallery/like/:id
// @desc    Increment like count for an image
router.put('/like/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // In db fallback, we increment, in real pg, we run update
    let result;
    const isMock = db.getUseMockDb && db.getUseMockDb();
    if (isMock) {
      result = await db.query(`UPDATE gallery SET likes = likes + 1 WHERE id = $1 RETURNING *`, [id]);
    } else {
      result = await db.query('UPDATE gallery SET likes = likes + 1 WHERE id = $1 RETURNING *', [id]);
    }
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Gallery image not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error liking gallery image' });
  }
});

// @route   DELETE api/gallery/:id
// @desc    Delete a gallery image
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM gallery WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Gallery image not found' });
    }
    res.json({ message: 'Gallery image deleted successfully', image: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting gallery image' });
  }
});

module.exports = router;
