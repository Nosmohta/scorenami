const axios = require('axios');

const config = require('../config/config');
const camelCaseToSnakeCase = require('../utils/camel-case-to-snake-case');
const proFootballApiSchemaMap = require('./pro-football-api-schema-map');

const PFARequest = (resource, args) => {
  const apiArgs = camelCaseToSnakeCase(args);
  const query = Object.assign({ api_key: process.env.PRO_FOOTBALL_API_KEY }, apiArgs);

  return axios.post(`${config.proFootballApiUrl}/${resource}`, query).then(response => {
    return translateResponseData(resource, response.data);
  });
};

const translateResponseData = (resource, responseData) => {
  const resourceTranslatorMap = {
    game: translateGameSchema,
    plays: translatePlaysSchema,
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

const translateAllStatSchemas = statsData => {
  return {
    passing: translateStatTypesSchema(statsData.passing, 'passing'),
    rushing: translateStatTypesSchema(statsData.rushing, 'rushing'),
    kickReturn: translateStatTypesSchema(statsData.kick_return, 'return'),
    puntReturn: translateStatTypesSchema(statsData.punt_return, 'return'),
    receiving: translateStatTypesSchema(statsData.receiving, 'receiving'),
    fumbles: translateStatTypesSchema(statsData.fumbles, 'fumbles'),
    kicking: translateStatTypesSchema(statsData.kicking, 'kicking'),
    defense: translateStatTypesSchema(statsData.defense, 'defense'),
    punting: translateStatTypesSchema(statsData.punting, 'punting')
  };
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
  return playsData.map(play => {
    return transformPropNames(play, 'play');
  });
};

const translateStatTypesSchema = (statsData, type) => {
  const stats = Object.keys(statsData).map(playId => {
    const statData = transformPropNames(statsData[playId], type);

    return Object.assign(statData, { playNumber: playId });
  });

  return stats;
};

module.exports = PFARequest;
