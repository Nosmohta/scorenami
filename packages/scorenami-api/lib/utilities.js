const axios = require('axios');

const config = require('../config/config');

const PFARequest = (resource, args) => {
  const composedQuery = Object.assign({ api_key: process.env.PRO_FOOTBALL_API_KEY }, args);

  return axios.post(`${config['apiBaseUrl']}/${resource}`, composedQuery);
};

const translateGameSchema = dataAPI => {
  const game = dataAPI;
  game.id = dataAPI.nfl_id;
  game.seasonType = dataAPI.season_type;
  game.awayScore = dataAPI.home_score;
  game.awayScore = dataAPI.away_score;
  game.home = translateTeamGameDetailSchema(dataAPI.home);
  game.away = translateTeamGameDetailSchema(dataAPI.away);

  return game;
};

const translateTeamGameDetailSchema = dataAPI => {
  const teamGame = dataAPI;
  const drives = [];

  for (drive in dataAPI.drives) {
    drives.push(translateDriveSchema(dataAPI.drives[drive]));
  }

  teamGame.drives = drives;
  teamGame.stats = translateAllStatSchemas(dataAPI.stats);

  return teamGame;
};

const translateDriveSchema = dataAPI => {
  const drive = dataAPI;
  drive.id = dataAPI.nfl_id;
  drive.driveId = dataAPI.drive_id;
  const plays = [];

  for (play in dataAPI.plays) {
    plays.push(dataAPI.plays[play]);
  }

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

const translatePlaySchema = dataAPI => {
  const play = dataAPI;
  play.id = dataAPI.nfl_id;

  return play;
};

const translateStatTypesSchema = statsDataAPI => {
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
        let key = Object.keys(propNamePair)[0];
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

module.exports = {
  PFARequest,
  translateGameSchema,
  translateDriveSchema,
  translatePlaySchema,
  translateAllStatSchemas,
  translateTeamGameDetailSchema
};
