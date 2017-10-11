const _ = require('lodash');
const moment = require('moment');

const getCurrentNFLYear = () => {
  console.log(Date.now());
  console.log(_.now());
  console.log(moment().week());
  console.log(moment().year());
  const weekOfTheYear = moment().week();
  const currentYear = moment().year();

  console.log(weekOfTheYear >= 50 ? currentYear : currentYear - 1);
  return weekOfTheYear >= 10 ? currentYear : currentYear - 1;
};

const getCurrentWeek = allGames => {
  // sort games by start time
  const sortedGames = _.sortBy(allGames, ['time']);

  // find first index where current time is > game time, get week and seasonType from that game.
  const currentTimeInSeconds = Math.round(Date.now() / 1000);
  console.log('currentTime: ', currentTimeInSeconds);
  const mostRecentGameIndex = _.findIndex(sortedGames, g => g.time < currentTimeInSeconds);
  console.log('GAME INDEX: ', mostRecentGameIndex);

  // if game is not final then return game week , else find next game and return its week.
  if (mostRecentGameIndex === -1) {
    return 'Pre Week 1';
  } else if (sortedGames[mostRecentGameIndex].final !== 1) {
    return composeWeekString(sortedGames[mostRecentGameIndex]);
  } else {
    return composeWeekString(sortedGames[mostRecentGameIndex + 1]);
  }
};

const composeWeekString = currentWeekGame => {
  const seasonType = currentWeekGame.seasonType;
  const currentWeek = currentWeekGame.week;
  if (seasonType === 'PRE') {
    return `Pre Week ${currentWeek}`;
  } else if (seasonType === 'REG') {
    return `Week ${currentWeek}`;
  } else if (seasonType === 'POST') {
    const postSeasonWeeks = ['Wild Card', 'Div. Playoff', 'Conf. Champ', 'SuperBowl'];
    return postSeasonWeeks[currentWeek - 1] ? postSeasonWeeks[currentWeek - 1] : null;
  } else {
    return null;
  }
};

const generateWeeksArray = (maxWeeks, prefix) => {
  const weeks = [];
  for (let wk = 1; wk <= maxWeeks; wk++) {
    weeks.push(prefix + ' ' + wk);
  }

  return weeks;
};

const createWeeks = (games, seasonType) => {
  const maxWeeks = _.maxBy(games, 'week').week;
  const weeks = [];
  if (seasonType === 'PRE') {
    return generateWeeksArray(maxWeeks, 'Pre Week');
  }
  if (seasonType === 'REG') {
    return generateWeeksArray(maxWeeks, 'Week');
  }
  if (seasonType === 'POST') {
    return ['Wild Card', 'Div. Playoff', 'Conf. Champ', 'SuperBowl'];
  }
  return [];
};

const parseSeasonData = seasonData => {
  const seasonTypeMap = {
    PRE: preSeasonGames,
    REG: regularSeasonGames,
    POST: postSeasonGames
  };
  const preSeasonGames = [];
  const regularSeasonGames = [];
  const postSeasonGames = [];

  seasonData.map(game => {
    if (seasonTypeMap[game.seasonType]) {
      seasonTypeMap[game.seasonType].push(game);
    }
  });

  const allSeasonGames = _.concat(preSeasonGames, regularSeasonGames, postSeasonGames);

  const preSeasonWeeks = createWeeks(preSeasonGames, 'PRE');
  const regularSeasonWeeks = createWeeks(regularSeasonGames, 'REG');
  const postSeasonWeeks = createWeeks(postSeasonGames, 'POST');
  const allSeasonWeeks = _.concat(preSeasonWeeks, regularSeasonWeeks, postSeasonWeeks);
  const currentWeek = getCurrentWeek(allSeasonGames);
  const currentYear = getCurrentNFLYear();

  const seasonDetails = {
    currentWeek,
    currentYear,
    preSeasonWeeks,
    regularSeasonWeeks,
    postSeasonWeeks,
    allSeasonWeeks
  };

  console.log('SEASON DETAILS: ', seasonDetails);
  return seasonDetails;
};

module.exports = { parseSeasonData };
