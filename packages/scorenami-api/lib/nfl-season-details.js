const _ = require('lodash');
const moment = require('moment');

const postSeasonWeeks = [
  {
    displayName: 'Wild Card',
    seasonType: 'POST',
    weekNumber: 1
  },
  {
    displayName: 'Div. Playoff',
    seasonType: 'POST',
    weekNumber: 2
  },
  {
    displayName: 'Conf. Champ',
    seasonType: 'POST',
    weekNumber: 3
  },
  {
    displayName: 'Super Bowl',
    seasonType: 'POST',
    weekNumber: 4
  }
];

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
  const postSeasonWeekNames = postSeasonWeeks.map(week => week.displayName);

  const currentWeek = currentWeekGame.week;
  if (seasonType === 'PRE') {
    return `Pre Week ${currentWeek}`;
  } else if (seasonType === 'REG') {
    return `Week ${currentWeek}`;
  } else if (seasonType === 'POST') {
    return postSeasonWeekNames[currentWeek - 1] ? postSeasonWeekNames[currentWeek - 1] : null;
  } else {
    return null;
  }
};

const createWeek = (weekNumber, seasonType, prefix) => {
  return {
    displayName: `${prefix} ${weekNumber}`,
    seasonType: seasonType,
    weekNumber: weekNumber
  };
};

const createWeeks = (games, seasonType) => {
  const maxWeeks = games.length > 0 ? _.maxBy(games, 'week').week : {};

  if (seasonType === 'PRE') {
    return _.range(1, maxWeeks + 1).map(week => {
      return createWeek(week, 'PRE', 'Pre Week');
    });
  } else if (seasonType === 'REG') {
    return _.range(1, maxWeeks + 1).map(week => {
      return createWeek(week, 'REG', 'Week');
    });
  } else if (seasonType === 'POST') {
    return postSeasonWeeks;
  } else {
    return [];
  }
};

const parseSeasonData = seasonData => {
  const games = {
    PRE: [],
    REG: [],
    POST: []
  };

  seasonData.map(game => {
    if (games[game.seasonType]) {
      games[game.seasonType].push(game);
    }
  });

  const allSeasonGames = _.concat(games.PRE, games.REG, games.POST);

  const preSeasonWeeks = createWeeks(games.PRE, 'PRE');
  const regularSeasonWeeks = createWeeks(games.REG, 'REG');
  const postSeasonWeeks = createWeeks(games.POST, 'POST');
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
