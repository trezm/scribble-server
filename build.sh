#!/bin/bash

echo "Starting build..."

rm tmp/*.sql; node ./bin/generateSqlDB.js; mv ./some-db-file.sqlt ./tmp/collection.anki2; cd tmp/; zip test.apkg collection.anki2 media; cd ..
