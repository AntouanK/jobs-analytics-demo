
'use strict';

const r         = require('rethinkdb'),
      express   = require('express');

const app       = express();


app.get('/', function (req, res) {

  res.end('ok');
});

//  listen to port 80
app.listen(80);
console.log('listening to port 80...');
