const axios = require('axios');
const chalk = require('chalk');

const config = require('../config/config');

const { PFARequest, translatePlaySchema } = require('../lib/utilities');

const getPlays = args => {
  return PFARequest('plays', args)
    .then(response => {
      return response.data.map(play => {
        return translatePlaySchema(play);
      });
    })
    .catch(error => {
      console.log(chalk.red(error));
      return new Error(error);
    });
};

module.exports = getPlays;
