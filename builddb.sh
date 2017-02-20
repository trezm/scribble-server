#!/bin/bash

node bin/generateSqlDB.js;
mv some-db-file.sqlt ./tmp/collection.anki2;
cd ./tmp;
zip ../output/deck.apkg ./*;
cd ..; rm ./tmp/*.sql;
