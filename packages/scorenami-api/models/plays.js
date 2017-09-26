const axios = require('axios');
const chalk = require('chalk');

const config = require('../config/config');

const { APICall, translatePlaySchema } = require('../lib/utilities');

const getPlays = args => {
  return APICall('plays', args)
    .then(response => {
      return response.data.map(play => {
        return translatePlaySchema(play)
      })
    })
    .catch(error => {
      console.log(chalk.red(error));
      return new Error(error);
    });
};

module.exports = getPlays;
