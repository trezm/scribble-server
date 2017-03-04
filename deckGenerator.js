const EJS = require('ejs2');
const ejs = new EJS({ cache: true });
const v4 = require('uuid').v4;
const crypto = require('crypto');
const fs = require('fs');

const DECK_ID =           require('./constants').DECK_ID;
const MODEL_ID =          require('./constants').MODEL_ID;
const configuration =     require('./constants').configuration;
const deckConfiguration = require('./constants').deckConfiguration;
const decks =             require('./constants').decks;
const models =            require('./constants').models;

let notes = require('./templates/notes.json');
let cards = require('./templates/cards.json');

function sha1(data) {
  const generator = crypto.createHash('sha1');
  generator.update(data);
  return parseInt('0x' + (generator.digest('hex').substr(0, 8)));
}

function generateNote(front, back, tags) {
  return {
    id: generateNumberId(),
    guid: v4(),
    modelId: MODEL_ID,
    fields: [front, back],
    firstField: `${front}`,
    checksum: sha1(`${front}`),
    tags: tags
  };
}

function generateCard(noteId) {
  return {
    id: generateNumberId(),
    noteId: noteId,
    deckId: DECK_ID
  };
}

function generateNumberId() /* t:Number */ {
  return Math.floor(Math.random() * 1000000000000);
}

function createNoteAndCard(front, back, tags) {
  const note = generateNote(front, back, tags);
  const card = generateCard(note.id);

  notes.push(note);
  cards.push(card);

  fs.writeFileSync('./templates/notes.json', JSON.stringify(notes));
  fs.writeFileSync('./templates/cards.json', JSON.stringify(cards));
}

function generateSql() {
  const global = {
    deckId: DECK_ID,
    configuration: JSON.stringify(configuration),
    models: JSON.stringify(models),
    decks: JSON.stringify(decks(`A deck ${Date.now()}`)),
    deckConfiguration: JSON.stringify(deckConfiguration),
    notes: notes,
    cards: cards,
    now: Date.now() * 1000
  };

  return new Promise((resolve, reject) => {
    ejs.renderFile('templates/deck.ejs.sql', global, (err, sql) => {
      if (err) {
        return reject(err);
      }

      resolve(sql);
    });
  });
}

function resetDeck() {
  notes = [];
  cards = [];

  fs.writeFileSync(`${__dirname}/templates/media.json`, JSON.stringify({}, null, 2));
  fs.writeFileSync(`${__dirname}/processing/media`, JSON.stringify({}));
  fs.writeFileSync(`${__dirname}/templates/notes.json`, JSON.stringify(notes));
  fs.writeFileSync(`${__dirname}/templates/cards.json`, JSON.stringify(cards));
}

module.exports = {
  createNoteAndCard: createNoteAndCard,
  generateSql: generateSql,
  resetDeck: resetDeck
};
