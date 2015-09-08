
'use strict';

const express         = require('express'),
      bodyParser      = require('body-parser'),
      morgan          = require('morgan'),
      graphqlHTTP     = require('express-graphql'),
      checkStatsObj   = require('./check-country-stats'),
      addCountryStats = require('./add-country-stats'),
      getCountryStats = require('./get-country-stats'),
      schema          = require('./graphQL/schema');


const app = express();
app.use( morgan('dev') );


app.use(
  '/graphql',
  graphqlHTTP({ schema: schema, pretty: true })
);


app.get(
  '/',
  (req, res) => { res.end('ok'); }
);


app.get(
  '/test',
  (req, res) => {
    getCountryStats.getCountryMostDevs()
    .then(result  => { res.json(result); })
    .catch(err    => { res.end(`Error ${err.message}`)});
  }
);


app.post(
  '/add/countries',
  bodyParser.json({ limit: '300kb' }),
  (req, res) => {

    let countriesStats  = req.body.countriesStats,
        timestamp       = req.body.timestamp;

    if(!(timestamp > 0)){
      throw new Error('wrong timestamp');
    }

    if(!Array.isArray(countriesStats)){
      throw new Error('countriesStats must be an Array');
    }

    var promises =
    countriesStats
    .filter(checkStatsObj)
    .map((statsObj) => {

      let mappedObj = {
        id:     statsObj.id,
        code:   statsObj.code,
        name:   statsObj.name,
        snapshots: [
          {
            id:       statsObj.results.created,
            count:    statsObj.count,
            results:  statsObj.results
          }
        ]
      };

      return mappedObj;
    })
    .map(addCountryStats);

    Promise.all(promises)
    .then(() => {
      res.end(`${promises.length} countries' stats were added.`);
    })
    .catch(err => {
      res.end(err.message);
    });
  }
);

//  listen to port 80
app.listen(80);
console.log('listening to port 80...');
