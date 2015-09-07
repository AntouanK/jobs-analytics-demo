
'use strict';

const r       = require('rethinkdb'),
      db      = require('./db');


const byId = function (id) {

  return r
  .table('countryStats')
  .get(id)
  .run(db.conn);
};

module.exports = {
  byId
};
