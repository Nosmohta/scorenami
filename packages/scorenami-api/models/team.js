const axios = require('axios');
const chalk = require('chalk');

const config = require('../config/config');

const { PFARequest, translateGameSchema } = require('../lib/utilities');

const getTeam = args => {
  return PFARequest('teams', args)
    .then(response => {
      console.log('RAW RESPONSE: ', response.data);
      let games = response.data.map(game => {
        return translateGameSchema(game);
      });
      console.log('TEAM RESPONSE: ', response.data);
      return games;
    })
    .catch(error => {
      console.log(chalk.red(error));
      return new Error(error);
    });
};

module.exports = getTeam;
