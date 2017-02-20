const express = require('express');
const multer = require('multer');
const fs = require('fs');
const deckGenerator = require('./deckGenerator');
const sqlDBGenerator = require('./sqlDBGenerator');

const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${__dirname}/processing/`);
  },
  filename: (req, file, callback) => {
    const mimeType = file.mimetype;
    console.log('file:', JSON.stringify(file));

    callback(null, `${file.fieldname}-${Date.now()}.${mimeType.split('/').pop()}`);
  }
});

const upload = multer({
    storage : storage
  })
  .fields([
    { name: 'top-image', maxCount: 1 },
    { name: 'bottom-image', maxCount: 1 },
    { name: 'tags', maxCount: 1 }
  ]);

app
  .all('*', (req, res, next) => {
    console.log(`[${new Date()}] ${req.method} ${req.path}`);

    if (req.body) {
      console.log(JSON.stringify(req.body));
    }

    next();
  })
  .get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
  })
  .get('/latest.apkg', (req, res) => {
    res.sendFile(`${__dirname}/output/deck.apkg`)
  })
  .delete('/api/decks', (req, res) => {
    fs.writeFileSync(`${__dirname}/templates/media.json`, JSON.stringify({}, null, 2));
    fs.writeFileSync(`${__dirname}/processing/media`, JSON.stringify({}));
    fs.writeFileSync(`${__dirname}/templates/notes.json`, JSON.stringify([]));
    fs.writeFileSync(`${__dirname}/templates/cards.json`, JSON.stringify([]));

    res.json({
      success: true
    });
  })
  .post('/api/photo', (req, res) => {
    upload(req, res, (err) => {
      let media = require('./templates/media.json');
      const keyCount = Object.keys(media) && Object.keys(media).length || 0;

      if (err) {
        console.error('[ERROR]:', err);

        return res.status(400)
          .json({
            success: false
          });
      }

      media[keyCount] = req.files['top-image'][0].filename;
      media[keyCount + 1] = req.files['bottom-image'][0].filename;

      fs.writeFileSync(`${__dirname}/templates/media.json`, JSON.stringify(media, null, 2));
      fs.writeFileSync(`${__dirname}/processing/media`, JSON.stringify(media));

      fs.renameSync(
        `${__dirname}/processing/${req.files['top-image'][0].filename}`,
        `${__dirname}/processing/${keyCount}`);
      fs.renameSync(
        `${__dirname}/processing/${req.files['bottom-image'][0].filename}`,
        `${__dirname}/processing/${keyCount + 1}`);

      deckGenerator.createNoteAndCard(
        `<img src="${req.files['top-image'][0].filename}"/>`,
        `<img src="${req.files['bottom-image'][0].filename}"/>`,
        req.body && req.body.tags);

      sqlDBGenerator.generateAnkiAndClean()
        .then(() => {
          res.json({
            success: true
          });
        })
        .catch((err) => {
          console.log('err:', err);
          res.status(400).json({
            success: false
          });
        });
    });
  })
  .listen(PORT, () => {
    console.log(`Started on ${PORT}...`);
  });
