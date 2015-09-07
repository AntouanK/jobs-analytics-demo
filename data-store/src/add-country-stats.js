
'use strict';

const r       = require('rethinkdb'),
      db      = require('./db');



module.exports = function (givenStatsObj) {

  let startTime = Date.now();

  return r
  .table('countryStats')
  .get(givenStatsObj.id)
  .run(db.conn)
  .then(existingStatsObj => {

    if(existingStatsObj === null){
      return r
      .table('countryStats')
      .insert(givenStatsObj)
      .run(db.conn);
    }

    if(givenStatsObj.snapshots.length !== 1){
      throw new Error('more than 1 snapshots found in a new object!');
    }
    let newSnapshot = givenStatsObj.snapshots[0];

    let timestampExists =
    existingStatsObj
    .snapshots
    .some(thisStatsObj => {
      return thisStatsObj.id === newSnapshot.id;
    });

    if(timestampExists){
      return true;
    }

    //  it already exists, so add only the snapshot
    existingStatsObj.snapshots.push(newSnapshot);

    return r
    .table('countryStats')
    .update(existingStatsObj)
    .run(db.conn);
  })
  .then(() => {
    console.log(`[add-country-stats] done in ${Date.now() - startTime}ms`);
  });
};
