const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// @route   POST api/upload
// @desc    Upload an image (base64) and return its public URL path
router.post('/', async (req, res) => {
  const { image } = req.body;
  
  if (!image) {
    return res.status(400).json({ message: 'No image data provided' });
  }

  try {
    // Parse base64 data
    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ message: 'Invalid base64 image data format' });
    }

    const imageType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    // Get file extension
    let ext = 'png';
    if (imageType.includes('jpeg') || imageType.includes('jpg')) {
      ext = 'jpg';
    } else if (imageType.includes('webp')) {
      ext = 'webp';
    } else if (imageType.includes('gif')) {
      ext = 'gif';
    }

    const filename = `upload_${Date.now()}_${Math.floor(Math.random() * 1000)}.${ext}`;
    
    // Resolve absolute path to client/public/uploads
    const uploadDir = path.join(__dirname, '../../client/public/uploads');

    // Ensure upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);

    res.json({ url: `/uploads/${filename}` });
  } catch (err) {
    console.error('File write error:', err);
    res.status(500).json({ message: 'Failed to save uploaded image' });
  }
});

module.exports = router;
