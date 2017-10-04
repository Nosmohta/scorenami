const axios = require('axios');

const config = require('../config/config');
const camelCaseToSnakeCase = require('../utils/camel-case-to-snake-case');
const proFootballApiSchemaMap = require('./pro-football-api-schema-map');

const PFARequest = (resource, args) => {
  return axios
    .post(`${config['proFootballApiUrl']}/${resource}`, composePFAQuery(args))
    .then(response => {
      return translateResponseData(resource, response.data);
    });
};

const composePFAQuery = args => {
  const APIOptions = args.options ? camelCaseToSnakeCase(args.options) : {};
  delete args.options;
  const APIArgs = camelCaseToSnakeCase(args);

  return Object.assign({ api_key: process.env.PRO_FOOTBALL_API_KEY }, APIArgs, APIOptions);
};

const translateResponseData = (resource, responseData) => {
  const resourceTranslatorMap = {
    game: translateGameSchema,
    plays: translatePlaysSchema,
    players: translatePlayerStatsSchema,
    teams: translateTeamGameSummariesSchema,
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

const translateTeamGameSummariesSchema = games => {
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
  return gameSummaryData.map(gameSummary => transformPropNames(gameSummary, 'gameSummary'));
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

const translatePlayerStatsSchema = dataAPI => {
  const playerStats = {};
  const gameIds = Object.keys(dataAPI);
  playerStats.games = gameIds
    .map(gameId => {
      const keys = Object.keys(dataAPI[gameId]);
      const playerId = keys[0];
      const dataShape = playerId.match('-') ? 'nested' : 'notNested';

      if (dataShape === 'notNested') {
        return;
      } else {
        return translatePlayerGameStatsSchema(dataAPI[gameId], gameId, playerId);
      }
    })
    .filter(stat => stat);

  return playerStats;
};

const translatePlayerGameStatsSchema = (gameStatsAPI, gameId, playerId) => {
  const statTypes = Object.keys(gameStatsAPI[playerId]);
  const playerGameStats = {};
  statTypes.map(statType => {
    const statData = Object.assign(gameStatsAPI[playerId][statType], { playerId: playerId });

    const translatedStatData = { [statType]: transformPropNames(statData, statType) };
    Object.assign(playerGameStats, translatedStatData);
  });

  return Object.assign(playerGameStats, { gameId: gameId });
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

const translatePlaysSchema = playsDataAPI => {
  return playsDataAPI.map(playAPI => {
    const play = transformPropNames(playAPI, 'play');
    play.possessionTeam = play.possessionTeam ? play.possessionTeam : 'NoName';
    play.opponent = play.opponent ? play.opponent : 'NoName';
    return play;
  });
};

const translateAllStatSchemas = dataAPI => {
  return {
    passing: dataAPI.passing ? translateStatTypesSchema(dataAPI.passing, 'passing') : [],
    rushing: dataAPI.rushing ? translateStatTypesSchema(dataAPI.rushing, 'rushing') : [],
    kickReturn: dataAPI.kick_return
      ? translateStatTypesSchema(dataAPI.kick_return, 'kickReturn')
      : [],
    puntReturn: dataAPI.punt_return
      ? translateStatTypesSchema(dataAPI.punt_return, 'puntReturn')
      : [],
    receiving: dataAPI.receiving ? translateStatTypesSchema(dataAPI.receiving, 'receiving') : [],
    fumbles: dataAPI.fumbles ? translateStatTypesSchema(dataAPI.fumbles, 'fumbles') : [],
    kicking: dataAPI.kicking ? translateStatTypesSchema(dataAPI.kicking, 'kicking') : [],
    defense: dataAPI.defense ? translateStatTypesSchema(dataAPI.defense, 'defense') : [],
    punting: dataAPI.punting ? translateStatTypesSchema(dataAPI.punting, 'punting') : []
  };
};

const translateStatTypesSchema = (statsDataAPI, type) => {
  const playerIds = Object.keys(statsDataAPI);
  const stats = playerIds.map(playerId => {
    const statData = transformPropNames(statsDataAPI[playerId], type);

    return Object.assign(statData, { playerId: playerId });
  });
  return stats;
};

module.exports = PFARequest;
