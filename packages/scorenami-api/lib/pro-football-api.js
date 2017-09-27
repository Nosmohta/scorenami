const axios = require('axios');

const config = require('../config/config');

const PFARequest = (resource, args) => {
  const APIargs = toSnakeCase(args);
  const composedQuery = Object.assign({ api_key: process.env.PRO_FOOTBALL_API_KEY }, APIargs);

  return axios.post(`${config['apiBaseUrl']}/${resource}`, composedQuery).then(response => {
    return translateResponseData(resource, response.data);
  });
};

const translateResponseData = (resource, responseData) => {
  const resourceTranslatorMap = {
    game: translateGameSchema,
    plays: translatePlaysSchema,
    teams: translateTeamGamesSchema
  };

  return resourceTranslatorMap[resource](responseData);
};

const translateTeamGamesSchema = dataAPI => {
  return dataAPI.map(game => {
    return translateGameSchema(game);
  });
};

const translateGameSchema = dataAPI => {
  const game = dataAPI;
  game.gameId = dataAPI.nfl_id || dataAPI.nfl_game_id || dataAPI.id;
  game.seasonType = dataAPI.season_type ? dataAPI.season_type : null;
  game.awayScore = dataAPI.home_score ? dataAPI.home_score : null;
  game.awayScore = dataAPI.away_score ? dataAPI.away_score : null;
  game.home = dataAPI.home ? translateTeamGameDetailSchema(dataAPI.home) : null;
  game.away = dataAPI.away ? translateTeamGameDetailSchema(dataAPI.away) : null;

  return game;
};

const translateTeamGameDetailSchema = dataAPI => {
  const teamGame = dataAPI;
  const drives = [];

  for (const drive in dataAPI.drives) {
    drives.push(translateDriveSchema(dataAPI.drives[drive]));
  }

  teamGame.drives = drives;
  teamGame.stats = translateAllStatSchemas(dataAPI.stats);

  return teamGame;
};

const translateDriveSchema = dataAPI => {
  const drive = dataAPI;
  drive.driveId = dataAPI.drive_id;
  const plays = [];

  for (const play in dataAPI.plays) {
    plays.push(dataAPI.plays[play]);
  }

  drive.gameId = dataAPI.nfl_id;
  drive.playId = dataAPI.play_id;
  drive.plays = plays;

  return drive;
};

const translateAllStatSchemas = dataAPI => {
  return {
    passing: translateStatTypesSchema(dataAPI.passing),
    rushing: translateStatTypesSchema(dataAPI.rushing),
    kickReturn: translateStatTypesSchema(dataAPI.kick_return),
    puntReturn: translateStatTypesSchema(dataAPI.punt_return),
    receiving: translateStatTypesSchema(dataAPI.receiving),
    fumbles: translateStatTypesSchema(dataAPI.fumbles),
    kicking: translateStatTypesSchema(dataAPI.kicking),
    defense: translateStatTypesSchema(dataAPI.defense),
    punting: translateStatTypesSchema(dataAPI.punting)
  };
};

const translatePlaysSchema = playsDataAPI => {
  return playsDataAPI.map(play => {
    return translatePlaySchema(play);
  });
};

const translatePlaySchema = dataAPI => {
  const play = dataAPI;
  play.gameId = dataAPI.nfl_id;
  play.playId = dataAPI.play_id;

  return play;
};

const translateStatTypesSchema = statsDataAPI => {
  console.log(statsDataAPI);

  const playIds = Object.keys(statsDataAPI);
  const propNames = playIds.length > 0 ? Object.keys(statsDataAPI[playIds[0]]) : [];
  const propNameTransformMap = propNames.map(propName => {
    return {
      [propName]: propName.replace(/_([a-z,0-9])/g, g => g[1].toUpperCase())
    };
  });
  const stats = playIds.map(playId => {
    const statData = {};
    const statsData = statsDataAPI[playId];
    propNameTransformMap
      .map(propNamePair => {
        const key = Object.keys(propNamePair)[0];
        const newPropName = propNamePair[key];
        return { [newPropName]: statsData[key] };
      })
      .map(stat => {
        Object.assign(statData, stat);
      });

    return Object.assign(statData, { playNumber: playId });
  });

  return stats;
};

const toSnakeCase = args => {
  const oldKeys = Object.keys(args);
  const hashMap = oldKeys.map(oldKey => {
    return {
      [oldKey]: oldKey.replace(/([A-Z])/g, $1 => {
        return '_' + $1.toLowerCase();
      })
    };
  });
  let newArgs = {};

  hashMap
    .map(keyValue => {
      let key = Object.keys(keyValue)[0];
      let newKey = keyValue[key];
      return { [newKey]: args[key] };
    })
    .map(KV => {
      Object.assign(newArgs, KV);
    });

  return newArgs;
};

module.exports = {
  PFARequest,
  translateGameSchema,
  translateDriveSchema,
  translatePlaySchema,
  translateAllStatSchemas,
  translateTeamGameDetailSchema
};
