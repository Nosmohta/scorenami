const axios = require('axios');

const config = require('../config/config');
const { schemaMap } = require('../config/schema-map');

const PFARequest = (resource, args) => {
  return axios.post(`${config['apiBaseUrl']}/${resource}`, composePFAQuery(args)).then(response => {
    return translateResponseData(resource, response.data);
  });
};

const composePFAQuery = args => {
  const APIOptions = args.options ? toSnakeCase(args.options) : {};
  delete args.options;
  const APIArgs = toSnakeCase(args);

  return Object.assign({ api_key: process.env.PRO_FOOTBALL_API_KEY }, APIArgs, APIOptions);
};

const translateResponseData = (resource, responseData) => {
  const resourceTranslatorMap = {
    game: translateGameSchema,
    plays: translatePlaysSchema,
    players: translatePlayerStatsSchema,
    teams: translateTeamGameSummariesSchema,
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

const translateTeamGameSummariesSchema = games => {
  return games.map(game => {
    return transformPropNames(game, 'teamGameSummary');
  });
};

const translateGameSchema = dataAPI => {
  const game = transformPropNames(dataAPI, 'game');
  game.home = translateTeamGameSchema(dataAPI.home);
  game.away = translateTeamGameSchema(dataAPI.away);

  return game;
};

const translateGameSummariesSchema = dataAPI => {
  return dataAPI.map(gameSummary => transformPropNames(gameSummary, 'gameSummary'));
};

const translateTeamGameSchema = dataAPI => {
  const teamGame = transformPropNames(dataAPI, 'teamGame');
  const drives = [];

  for (const drive in dataAPI.drives) {
    drives.push(translateDriveSchema(dataAPI.drives[drive]));
  }

  teamGame.drives = drives;
  teamGame.stats = translateAllStatSchemas(dataAPI.stats);

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
