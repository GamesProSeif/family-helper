const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
  res.status(200).render('share-index', {
    page: 'Home',
    home: true
  });
});

router.get('/download', (req, res) => {
  res.status(200).render('share-download', {
    page: 'Download',
    download: true,
    files: fs.readdirSync(path.join(__dirname, '..', '..', 'storage/'))
  });
});

router.get('/upload', (req, res) => {
  res.status(200).render('share-upload', {
    page: 'Upload',
    upload: true
  });
});

module.exports = router;
