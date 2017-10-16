const _ = require('lodash');
const moment = require('moment');

const getCurrentNFLYear = () => {
  const weekOfTheYear = moment().week();
  const currentYear = moment().year();

  return weekOfTheYear >= 10 ? currentYear : currentYear - 1;
};

const getCurrentWeek = allGames => {
  const sortedGames = _.sortBy(allGames, ['time']);
  const currentTimeInSeconds = Math.round(Date.now() / 1000);
  const nextGameIndex = _.findIndex(sortedGames, g => currentTimeInSeconds < g.time);

  if (nextGameIndex === -1) {
    return null;
  } else if (sortedGames[nextGameIndex - 1].final !== 1) {
    return composeWeekString(sortedGames[nextGameIndex - 1]);
  } else {
    return composeWeekString(sortedGames[nextGameIndex]);
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
  const maxWeeks = games.length > 0 ? _.maxBy(games, 'week').week : {};
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
  const preSeasonGames = [];
  const regularSeasonGames = [];
  const postSeasonGames = [];
  const seasonTypeMap = {
    PRE: preSeasonGames,
    REG: regularSeasonGames,
    POST: postSeasonGames
  };

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

  return seasonDetails;
};

module.exports = parseSeasonData;
