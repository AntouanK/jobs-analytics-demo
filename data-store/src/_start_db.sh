#!/bin/sh

docker rm -f rdbMain rdbSlaveA rdbSlaveB rdbSlaveC ;

docker run \
  -d \
  --name rdbMain \
  -v /home/core/data/main:/data \
  -p 11080:8080 \
  rethinkdb rethinkdb --bind all ;

sleep 2;

docker run \
  -d \
  --name rdbSlaveA \
  --link rdbMain \
  -v /home/core/data/slaveA:/data \
  rethinkdb rethinkdb --join rdbMain:29015 --bind all ;

docker run \
  -d \
  --name rdbSlaveB \
  --link rdbMain \
  -v /home/core/data/slaveB:/data \
  rethinkdb rethinkdb --join rdbMain:29015 --bind all ;

docker run \
  -d \
  --name rdbSlaveC \
  --link rdbMain \
  -v /home/core/data/slaveC:/data \
  rethinkdb rethinkdb --join rdbMain:29015 --bind all ;
