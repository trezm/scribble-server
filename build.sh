#!/bin/bash

echo "Starting build..."

rm processing/*.sql; node ./bin/generateSqlDB.js; mv ./some-db-file.sqlt ./processing/collection.anki2; cd processing/; zip test.apkg collection.anki2 media; cd ..
