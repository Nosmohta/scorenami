const chalk = require('chalk');

const { PFARequest } = require('../lib/pro-football-api');

const getTeam = args => {
  const teams = require('../../scorenami-client/src/data/nfl-teams');
  const teamNames = Object.keys(teams);

  teamNames.map(name => console);

  return PFARequest('teams', args.options).catch(error => {
    console.log(chalk.red(error));
    return new Error(error);
  });
};

module.exports = getTeam;
