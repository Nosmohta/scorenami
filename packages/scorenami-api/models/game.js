const chalk = require('chalk');

const config = require('../config/config');

const { PFARequest } = require('../lib/pro-football-api');

const getGame = args => {
  return PFARequest('game', args)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(chalk.red(error));
      return new Error(error);
    });
};

module.exports = getGame;
