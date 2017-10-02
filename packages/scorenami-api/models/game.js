const chalk = require('chalk');

const PFARequest = require('../lib/pro-football-api');

const getGame = args => {
  return PFARequest('game', args).catch(error => {
    console.log(chalk.red(error));
    return new Error(error);
  });
};

module.exports = getGame;
