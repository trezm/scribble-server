#!/bin/bash

node bin/generateSqlDB.js;
mv some-db-file.sqlt ./processing/collection.anki2;
cd ./processing;
rm ./*.sql;
zip ../output/deck.apkg ./*;
cd ..;
