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
  async function f() {
    try {
      let storageFound = await fs.existsSync(path.join(__dirname, '..', '..', 'storage/'));
      let files = storageFound ? fs.readdirSync(path.join(__dirname, '..', '..', 'storage/')) : [];
      res.status(200).render('share-download', {
        page: 'Download',
        download: true,
        files
      });
    } catch(e) {
      console.log(e);
    }
  }
  f();
});

router.get('/upload', (req, res) => {
  res.status(200).render('share-upload', {
    page: 'Upload',
    upload: true
  });
});

module.exports = router;
