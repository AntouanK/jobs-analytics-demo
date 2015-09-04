
'use strict';

const util = require('util');

module.exports = function (statsObj) {

  if(!util.isObject(statsObj)){
    throw new Error('stats must be an object');
  }

  if(isNaN(statsObj.id)){
    throw new Error('no id found');
  }

  if(typeof statsObj.code !== 'string'){
    throw new Error('no code found');
  }

  if(!util.isObject(statsObj.results)){
    return false;
  }

  return true;
};
