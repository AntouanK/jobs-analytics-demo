
FROM antouank/node:4.0.0-rc.1

WORKDIR /home/docker/data-store

ADD ./package.json    ./
ADD ./src             ./src

RUN npm i ;

CMD node ./src/index.js
