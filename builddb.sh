#!/bin/bash

node bin/generateSqlDB.js;
mv some-db-file.sqlt ./processing/collection.anki2;
cd ./processing;
zip ../output/deck.apkg ./*;
cd ..; rm ./processing/*.sql;
