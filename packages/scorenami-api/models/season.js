const chalk = require('chalk');

const PFARequest = require('../lib/pro-football-api');
const parseSeasonData = require('../lib/nfl-season-details');

const getSeasonDetails = args => {
  return PFARequest('schedule', args)
    .then(response => {
      return parseSeasonData(response);
    })
    .catch(error => {
      console.log(chalk.red(error));
      return new Error(error);
    });
};

module.exports = getSeasonDetails;
