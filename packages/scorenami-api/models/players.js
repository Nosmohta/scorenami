const chalk = require('chalk');

const PFARequest = require('../lib/pro-football-api');

const getPlayerStats = args => {
  return PFARequest('players', args).catch(error => {
    console.log(chalk.red(error));
    return new Error(error);
  });
};

module.exports = getPlayerStats;
