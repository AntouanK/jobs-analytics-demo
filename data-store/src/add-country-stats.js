
'use strict';

const r       = require('rethinkdb'),
      db      = require('./db');



module.exports = function (statsObj) {

  return r
  .table('countryStats')
  .insert(statsObj, { conflict: 'update' })
  .run(db.conn);
};
