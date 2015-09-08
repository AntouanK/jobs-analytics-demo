
FROM antouank/alp-node

WORKDIR /home/docker/data-store

ADD ./package.json    ./
ADD ./src             ./src

RUN npm i ;

CMD node ./src/index.js
