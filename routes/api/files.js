const express = require('express');
const fs = require('fs');
const path = require('path');
const formidableMiddleware = require('express-formidable');

const router = express.Router();

router.use(express.static(path.join(__dirname, '..', '..', 'storage')));

router.use(formidableMiddleware());

router.post('/', (req, res) => {
  async function f() {
    try {
      let storageFound = await fs.existsSync(path.join(__dirname, '..', '..', 'storage/'));
      if (!storageFound) {
        await fs.mkdirSync(path.join(__dirname, '..', '..', 'storage/'));
      }
      let oldpath = req.files.filetoupload.path;
      let newpath = path.join(__dirname, '..', '..', 'storage', req.files.filetoupload.name);
      let writer = fs.createWriteStream(newpath);
      let reader = fs.createReadStream(oldpath);
      await reader.pipe(writer);
      res.status(200).render('share-done', {
        page: 'Uploaded',
        file: req.files.filetoupload.name
      })
    } catch (e) {
      console.log(e);
    }
  }
  f();
});

module.exports = router;
