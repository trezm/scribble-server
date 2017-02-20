'use strict';
const fs = require('fs');
const v4 = require('uuid').v4;

const deckGenerator = require('./deckGenerator').generateSql;
const exec = require('child_process').exec;

module.exports = {
  generateAnkiAndClean: generateAnkiAndClean,
  makeDb: makeDb
};

/**
 * @function clear
 * @returns Promise<ReturnCode, Error> - A promise that resolves or rejects after the screen has been cleared
 */
function makeDb(scriptFile, dbFile) {
  return wrapProcess(`sqlite3 ${dbFile} < ${scriptFile}`);
}

function generateAnkiAndClean() {
/**
 * node bin/generateSqlDB.js;
mv some-db-file.sqlt ./tmp/collection.anki2;
cd ./tmp; zip ../deck.apkg ./*;
cd ..; rm ./tmp/*.sql;

 */
  return deckGenerator()
    .then((sql) => {
      const fileName = `${__dirname}/tmp/${v4()}.sql`;
      fs.writeFileSync(fileName, sql);
      return fileName;
    })
    .then(() => wrapProcess(`${__dirname}/builddb.sh`))
    .catch((err) => console.error('err:', err));


  return wrapProcess(`${__dirname}/builddb.sh`);
}

function wrapProcess(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }

      resolve(stdout);
    });
  });
}
