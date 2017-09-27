const axios = require('axios');
const chalk = require('chalk');

const config = require('../config/config');

const { PFARequest } = require('../lib/pro-football-api');

const getPlays = args => {
  return PFARequest('plays', args.options).catch(error => {
    console.log(chalk.red(error));
    return new Error(error);
  });
};

module.exports = getPlays;
