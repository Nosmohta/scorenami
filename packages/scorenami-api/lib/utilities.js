const axios = require('axios');

const config = require('../config/config');

const APICall = (resource, args) => {
  const composedQuery = Object.assign({ api_key: process.env.PRO_FOOTBALL_API_KEY }, args);

  return axios.post(`${config['apiBaseUrl']}/${resource}`, composedQuery)
}

const translateGameSchema = (dataAPI) => {
  const dataGraphQL = dataAPI
  dataGraphQL.id = dataAPI.nfl_id
  dataGraphQL.seasonType = dataAPI.season_type
  dataGraphQL.awayScore = dataAPI.home_score
  dataGraphQL.awayScore = dataAPI.away_score
  dataGraphQL.home = translateTeamGameDetailsSchema(dataAPI.home);
  dataGraphQL.away = translateTeamGameDetailsSchema(dataAPI.away);
  //console.log("TRANSLATE Game OUTPUT: ", dataGraphQL.home)
  return dataGraphQL
}

const translateTeamGameDetailsSchema = (dataAPI) => {
  const dataGraphQL = dataAPI
  const drives = []
  for (drive in dataAPI.drives) {
    drives.push(translateDriveSchema(dataAPI.drives[drive]))
  }
  dataGraphQL.drives = drives

  return dataGraphQL
}

const translateDriveSchema = (dataAPI) => {
  const dataGraphQL = dataAPI
  dataGraphQL.id = dataAPI.nfl_id
  dataGraphQL.driveId = dataAPI.drive_id
  const plays = []
  for (play in dataAPI.plays) {
    plays.push(dataAPI.plays[play])
  }
  dataGraphQL.plays = plays

  return dataGraphQL
}

const translatePlaySchema = (dataAPI) => {
  const dataGraphQL = dataAPI
  dataGraphQL.id = dataAPI.nfl_id

  return dataGraphQL
}

module.exports = {
  APICall,
  translateDriveSchema,
  translateGameSchema,
  translatePlaySchema,
 }
