const del = require('del');

// Configuration file
const config = require('../config/path');

//To clear the old files
const clear = () => {
  return del(config.root);
};

module.exports = clear;
