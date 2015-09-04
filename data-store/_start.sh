#!/bin/sh

docker rm -f data-store rdb ;

docker run \
  -d \
  --name rdb \
  -v /home/core/data:/data \
  -p 11080:8080 \
  rethinkdb ;

docker run \
  -d \
  --name data-store \
  --link rdb \
  -v $(pwd)/src:/home/docker/data-store/src \
  -p 11000:80 \
  antouank/data-store ;
