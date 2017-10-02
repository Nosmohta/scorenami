const chalk = require('chalk');

const PFARequest = require('../lib/pro-football-api');

const getSchedule = args => {
  return PFARequest('schedule', args).catch(error => {
    console.log(chalk.red(error));
    return new Error(error);
  });
};

module.exports = getSchedule;
