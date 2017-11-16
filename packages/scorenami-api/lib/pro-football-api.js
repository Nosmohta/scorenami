const axios = require('axios');
const _ = require('lodash');
const moment = require('moment');

const config = require('../config/config');
const camelCaseToSnakeCase = require('../utils/camel-case-to-snake-case');
const proFootballApiSchemaMap = require('./pro-football-api-schema-map');

const PFARequest = (resource, args) => {
  return axios
    .post(`${config.proFootballApiUrl}/${resource}`, composePFAQuery(args))
    .then(response => {
      return translateResponseData(resource, response.data);
    });
};

const composePFAQuery = args => {
  const apiOptions = args.options ? camelCaseToSnakeCase(args.options) : {};
  const apiArgs = camelCaseToSnakeCase(args);

  delete apiArgs.options;

  return Object.assign({ api_key: process.env.PRO_FOOTBALL_API_KEY }, apiArgs, apiOptions);
};

const translateResponseData = (resource, responseData) => {
  const resourceTranslatorMap = {
    game: translateGameSchema,
    plays: translatePlaysSchema,
    players: translatePlayerStatsSchema,
    teams: translateTeamGameSummarySchema,
    schedule: translateGameSummarySchema
  };

  return resourceTranslatorMap[resource](responseData);
};

const transformPropNames = (data, type) => {
  let transformedData = {};

  Object.keys(proFootballApiSchemaMap[type]).map(propName => {
    const transformedPropName = proFootballApiSchemaMap[type][propName];
    Object.assign(transformedData, { [transformedPropName]: data[propName] });
  });

  return transformedData;
};

const translateTeamGameSummarySchema = games => {
  return games.map(game => {
    return transformPropNames(game, 'teamGameSummary');
  });
};

const translateGameSchema = gameData => {
  const game = transformPropNames(gameData, 'game');

  game.home = translateTeamGameSchema(gameData.home);
  game.away = translateTeamGameSchema(gameData.away);

  return game;
};

const translateGameSummarySchema = gameSummaryData => {
  const currentTime = Math.round(Date.now() / 1000);
  const scheduledGames = [];
  const liveGames = [];
  const finalGames = [];
  const allGames = gameSummaryData.map(gameSummary =>
    transformPropNames(gameSummary, 'gameSummary')
  );

  allGames.map(game => {
    if (!game.seasonType) {
      return;
    }

    if (currentTime < game.time) {
      game.status = 'scheduled';
      scheduledGames.push(game);
    } else if (game.final !== 1 && currentTime - game.time < 60 * 60 * 10) {
      game.status = 'live';
      liveGames.push(game);
    } else {
      game.status = 'final';
      liveGames.push(game);
    }
  });

  const sortedAllGames = _.concat(
    sortGamesByTime(liveGames),
    sortGamesByTime(scheduledGames),
    sortGamesByTime(finalGames)
  );

  return sortedAllGames;
};

const sortGamesByTime = games => {
  return games.sort((a, b) => a.time - b.time);
};

const translateTeamGameSchema = teamGameData => {
  const teamGame = transformPropNames(teamGameData, 'teamGame');
  const drives = [];

  for (const drive in teamGameData.drives) {
    drives.push(translateDriveSchema(teamGameData.drives[drive]));
  }

  teamGame.drives = drives;
  teamGame.stats = translateAllStatSchemas(teamGameData.stats);

  return teamGame;
};

const translatePlayerStatsSchema = playerStatsData => {
  const playerStats = {};
  const gameIds = Object.keys(playerStatsData);

  playerStats.games = gameIds
    .map(gameId => {
      const keys = Object.keys(playerStatsData[gameId]);
      const playerId = keys[0];

      if (playerId.includes('-')) {
        return translatePlayerGameStatsSchema(playerStatsData[gameId], gameId, playerId);
      } else {
        return;
      }
    })
    .filter(stat => stat);

  return playerStats;
};

const translatePlayerGameStatsSchema = (playerGameStatsData, gameId, playerId) => {
  const statTypes = Object.keys(playerGameStatsData[playerId]);
  const playerGameStats = {};

  statTypes.map(statType => {
    const statData = Object.assign(playerGameStatsData[playerId][statType], { playerId: playerId });

    const translatedStatData = { [statType]: transformPropNames(statData, statType) };
    Object.assign(playerGameStats, translatedStatData);
  });

  return Object.assign({}, playerGameStats, { gameId: gameId });
};

const translateDriveSchema = driveData => {
  const drive = transformPropNames(driveData, 'drive');
  const plays = [];

  for (const play in driveData.plays) {
    plays.push(driveData.plays[play]);
  }

  drive.plays = translatePlaysSchema(plays);

  return drive;
};

const translatePlaysSchema = playsData => {
  return playsData.map(playAPI => {
    const play = transformPropNames(playAPI, 'play');

    play.possessionTeam = play.possessionTeam ? play.possessionTeam : null;
    play.opponent = play.opponent ? play.opponent : null;

    return play;
  });
};

const translateAllStatSchemas = allStatsData => {
  const {
    passing,
    rushing,
    kick_return,
    punt_return,
    receiving,
    fumbles,
    kicking,
    defense,
    punting
  } = allStatsData;

  return {
    passing: passing ? translateStatSchema(passing, 'passing') : [],
    rushing: rushing ? translateStatSchema(rushing, 'rushing') : [],
    kickReturn: kick_return ? translateStatSchema(kick_return, 'kickReturn') : [],
    puntReturn: punt_return ? translateStatSchema(punt_return, 'puntReturn') : [],
    receiving: receiving ? translateStatSchema(receiving, 'receiving') : [],
    fumbles: fumbles ? translateStatSchema(fumbles, 'fumbles') : [],
    kicking: kicking ? translateStatSchema(kicking, 'kicking') : [],
    defense: defense ? translateStatSchema(defense, 'defense') : [],
    punting: punting ? translateStatSchema(punting, 'punting') : []
  };
};

const translateStatSchema = (statsData, type) => {
  const playerIds = Object.keys(statsData);
  const stats = playerIds.map(playerId => {
    const statData = transformPropNames(statsData[playerId], type);

    return Object.assign(statData, { playerId: playerId });
  });
  return stats;
};

module.exports = PFARequest;
