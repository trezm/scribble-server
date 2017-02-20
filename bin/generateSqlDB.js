const fs = require('fs');
const v4 = require('uuid').v4;

const deckGenerator = require('../deckGenerator').generateSql;
const sqlDBGenerator = require('../sqlDBGenerator').makeDb;

deckGenerator()
  .then((sql) => {
    const fileName = `./processing/${v4()}.sql`;
    fs.writeFileSync(fileName, sql);
    return fileName;
  })
  .then((fileName) => sqlDBGenerator(fileName, 'some-db-file.sqlt'))
  .then(() => console.log('done!'))
  .catch((err) => console.error('err:', err));
