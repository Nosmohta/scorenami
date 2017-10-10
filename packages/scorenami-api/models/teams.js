const chalk = require('chalk');

const PFARequest = require('../lib/pro-football-api');

const getTeams = args => {
  return PFARequest('teams', args).catch(error => {
    console.log(chalk.red(error));
    return new Error(error);
  });
};

module.exports = getTeams;
