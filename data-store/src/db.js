
'use strict';

const r   = require('rethinkdb'),
      db  = {};


r
.connect({
  db: 'workshape',
  host: 'rdb',
  port: 28015
})
.then(function (newConn) {
  db.conn = newConn;

  return prepareTable(db.conn);
})
.then(function () {
  console.log('done preparing the db.');
})
.catch(function (err) {
  console.log(err.message);
});



//  prepare tables
const prepareTable = function (dbConn) {

  return r
  .tableList()
  .run(db.conn)
  .then(function (list) {
    console.log(`existing tables: ${list}`);

    if(list.indexOf('countryStats') < 0){
      console.log('creating table...');
      return r
      .tableCreate('countryStats')
      .run(db.conn);
    }
  });
};


module.exports = db;
