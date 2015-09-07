#!/bin/sh

docker rm -f data-store ;

docker run \
  -d \
  --name data-store \
  -v $(pwd)/src:/home/docker/data-store/src \
  -p 11000:80 \
  antouank/data-store ;
