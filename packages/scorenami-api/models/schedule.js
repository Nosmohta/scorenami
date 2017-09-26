const axios = require('axios');
const chalk = require('chalk');

const config = require('../config/config');

const getSchedule = args => {
  return axios
    .post(`${config['apiBaseUrl']}/schedule`, {
      api_key: process.env.PRO_FOOTBALL_API_KEY,
      year: args.year,
      month: args.month,
      day: args.day,
      time: args.time,
      season_type: args.seasonType,
      week: args.week,
      final: args.final
    })
    .then(response => {
      const schedule = [];

      response.data.forEach(game => {
        schedule.push({
          id: game.id,
          home: { team: game.home },
          away: { team: game.away },
          day: game.day,
          month: game.month,
          time: game.time,
          seasonType: game.season_type,
          week: game.week,
          year: game.year,
          final: game.final,
          homeScore: game.home_score,
          awayScore: game.away_score
        });
      });

      return schedule;
    })
    .catch(error => {
      console.log(chalk.red(error));
      return new Error(error);
    });
};

module.exports = getSchedule;
