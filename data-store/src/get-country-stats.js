
'use strict';

const r       = require('rethinkdb'),
      db      = require('./db');


//  given an Array of snapshots, you get back the one with the
//  latest creation date
const latestSnapshot = (snapshots) => {

  var latestDate =
  snapshots
  .map(s => { return s.results.created; })
  .sort()
  .pop();

  return snapshots
  .filter(snapshot => {
    return snapshot.results.created === latestDate;
  })
  .pop();
};



const byId = id => {

  return r
  .table('countryStats')
  .get(id)
  .run(db.conn);
};


const getCountryNamesList = () => {

  return r
  .table('countryStats')
  .pluck(['name', 'id'])
  .run(db.conn)
  .then(cursor => { return cursor.toArray(); });
};

const getCountryMostDevs = (length) => {

  if(isNaN(length)){
    length = 10;
  }

  return r
  .table('countryStats')
  .pluck('snapshots', 'id')
  .run(db.conn)
  .then(cursor => { return cursor.toArray(); })
  .then(list => {

    return list
    .map(country => {
      return {
        id: country.id,
        latestSnapshot: latestSnapshot(country.snapshots)
      };
    })
    .sort((left, right) => {
      if(left.latestSnapshot.count < right.latestSnapshot.count){
        return 1;
      }

      if(left.latestSnapshot.count > right.latestSnapshot.count){
        return -1;
      }

      return 0;
    })
    .slice(0, length);
  });
};


module.exports = {
  byId,
  getCountryNamesList,
  getCountryMostDevs
};
