
FROM antouank/alpine-iojs:3.3.0

WORKDIR /home/docker/data-store

ADD ./package.json    ./
ADD ./src             ./src

RUN npm i ;

CMD node ./src/index.js
