const chalk = require('chalk');

const PFARequest = require('../lib/pro-football-api');

const getPlays = args => {
  return PFARequest('plays', args).catch(error => {
    console.log(chalk.red(error));
    return new Error(error);
  });
};

module.exports = getPlays;
