const axios = require('axios');
const chalk = require('chalk');

const config = require('../config/config');

const { APICall, translateGameSchema } = require('../lib/utilities');

const getGame = args => {

  return APICall('game', args)
    .then(response => {
      return translateGameSchema(response.data);
    })
    .catch(error => {
      console.log(chalk.red(error));
      return new Error(error);
    });
};

module.exports = getGame;
