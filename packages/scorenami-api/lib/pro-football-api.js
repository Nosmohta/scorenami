const axios = require('axios');

const config = require('../config/config');
const { schemaMap } = require('../config/schema-map');

const PFARequest = (resource, args) => {
  const APIArgs = toSnakeCase(args);
  const composedQuery = Object.assign({ api_key: process.env.PRO_FOOTBALL_API_KEY }, APIArgs);

  return axios.post(`${config['apiBaseUrl']}/${resource}`, composedQuery).then(response => {
    return translateResponseData(resource, response.data);
  });
};

const translateResponseData = (resource, responseData) => {
  const resourceTranslatorMap = {
    game: translateGameSchema,
    plays: translatePlaysSchema,
    schedule: translateGameSummariesSchema
  };

  return resourceTranslatorMap[resource](responseData);
};

const transformPropNames = (data, type) => {
  const mapping = schemaMap[type];
  const APIPropNames = Object.keys(schemaMap[type]);
  const translated = {};

  APIPropNames.map(propName => {
    const translatedPropName = mapping[propName];
    Object.assign(translated, { [translatedPropName]: data[propName] });
  });

  return translated;
};

const translateGameSchema = dataAPI => {
  const game = transformPropNames(dataAPI, 'game');
  game.home = translateTeamGameDetailSchema(dataAPI.home);
  game.away = translateTeamGameDetailSchema(dataAPI.away);

  return game;
};

const translateGameSummariesSchema = dataAPI => {
  return dataAPI.map(gameSummary => transformPropNames(gameSummary, 'gameSummary'));
};

const translateTeamGameDetailSchema = dataAPI => {
  const teamGame = transformPropNames(dataAPI, 'teamGame');
  const drives = [];

  for (const drive in dataAPI.drives) {
    drives.push(translateDriveSchema(dataAPI.drives[drive]));
  }

  teamGame.drives = drives;
  teamGame.stats = translateAllStatSchemas(dataAPI.stats);

  return teamGame;
};

const translateAllStatSchemas = dataAPI => {
  return {
    passing: translateStatTypesSchema(dataAPI.passing, 'passing'),
    rushing: translateStatTypesSchema(dataAPI.rushing, 'rushing'),
    kickReturn: translateStatTypesSchema(dataAPI.kick_return, 'return'),
    puntReturn: translateStatTypesSchema(dataAPI.punt_return, 'return'),
    receiving: translateStatTypesSchema(dataAPI.receiving, 'receiving'),
    fumbles: translateStatTypesSchema(dataAPI.fumbles, 'fumbles'),
    kicking: translateStatTypesSchema(dataAPI.kicking, 'kicking'),
    defense: translateStatTypesSchema(dataAPI.defense, 'defense'),
    punting: translateStatTypesSchema(dataAPI.punting, 'punting')
  };
};

const translateDriveSchema = dataAPI => {
  const drive = transformPropNames(dataAPI, 'drive');
  const plays = [];

  for (const play in dataAPI.plays) {
    plays.push(dataAPI.plays[play]);
  }

  drive.plays = translatePlaysSchema(plays);

  return drive;
};

const translatePlaysSchema = playsDataAPI => {
  return playsDataAPI.map(play => {
    return transformPropNames(play, 'play');
  });
};

const translateStatTypesSchema = (statsDataAPI, type) => {
  const playIds = Object.keys(statsDataAPI);
  const stats = playIds.map(playId => {
    const statData = transformPropNames(statsDataAPI[playId], type);

    return Object.assign(statData, { playNumber: playId });
  });

  return stats;
};

const toSnakeCase = args => {
  const keys = Object.keys(args);
  const argsMapping = keys.map(key => {
    return {
      [key]: key.replace(/([A-Z])/g, $1 => {
        return '_' + $1.toLowerCase();
      })
    };
  });
  const newArgs = {};

  argsMapping.map(KV => {
    const key = Object.keys(KV)[0];
    const newProp = KV[key];
    Object.assign(newArgs, { [newProp]: args[key] });
  });

  return newArgs;
};

module.exports = {
  PFARequest
};
