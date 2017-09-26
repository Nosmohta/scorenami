const axios = require('axios');

const config = require('../config/config');

const APICall = (resource, args) => {
  const composedQuery = Object.assign({ api_key: process.env.PRO_FOOTBALL_API_KEY }, args);

  return axios.post(`${config['apiBaseUrl']}/${resource}`, composedQuery)
}

const translateGameSchema = (dataAPI) => {
  //console.log("API DATA: ", dataAPI.home.stats);

  const dataGraphQL = dataAPI
  dataGraphQL.id = dataAPI.nfl_id
  dataGraphQL.seasonType = dataAPI.season_type
  dataGraphQL.awayScore = dataAPI.home_score
  dataGraphQL.awayScore = dataAPI.away_score
  dataGraphQL.home = translateTeamGameDetailSchema(dataAPI.home)
  dataGraphQL.away = translateTeamGameDetailSchema(dataAPI.away)

  return dataGraphQL
}

const translateTeamGameDetailSchema = (dataAPI) => {
  const dataGraphQL = dataAPI
  const drives = []
  for (drive in dataAPI.drives) {
    drives.push(translateDriveSchema(dataAPI.drives[drive]))
  }
  dataGraphQL.drives = drives
  dataGraphQL.stats = translateStatsSchema(dataAPI.stats)

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

const translateStatsSchema = (dataAPI) => {
  return {
    passing: statsTransform(dataAPI.passing, 'playNumber'),
    rushing: statsTransform(dataAPI.rushing, 'playNumber'),
    kickReturn: statsTransform(dataAPI.kick_return, 'playNumber'),
    puntReturn: statsTransform(dataAPI.punt_return, 'playNumber'),
    receiving: statsTransform(dataAPI.receiving, 'playNumber'),
    fumbles: statsTransform(dataAPI.fumbles, 'playNumber'),
    kicking: statsTransform(dataAPI.kicking, 'playNumber'),
    defense: statsTransform(dataAPI.defense, 'playNumber'),
    punting: statsTransform(dataAPI.punting, 'playNumber'),
  }
}

const translatePlaySchema = (dataAPI) => {
  const dataGraphQL = dataAPI
  dataGraphQL.id = dataAPI.nfl_id

  return dataGraphQL
}

const statsTransform = (dataAPI, idPropName) => {
  const topKeys = Object.keys(dataAPI)
  const propNames = topKeys.length > 0 ? Object.keys(dataAPI[topKeys[0]]) : []
  const hashMap = propNames.map(oldPropName => {
    return {
      [oldPropName]: oldPropName.replace(/_([a-z,0-9])/g, (g) => g[1].toUpperCase())
    }
  })
  const dataGraphQL = topKeys.map(topKey => {
    let newObj = {};
    let oldObj = dataAPI[topKey]
    hashMap
      .map(keyValue => {
        let key = Object.keys(keyValue)[0]
        let newKey = keyValue[key]
        return { [newKey]: oldObj[key] }
      })
      .map(KV => { Object.assign(newObj, KV)})

    return Object.assign(newObj, { [idPropName]: topKey })
  })

  return dataGraphQL
}

module.exports = {
  APICall,
  translateGameSchema,
  translateDriveSchema,
  translatePlaySchema,
  translateStatsSchema,
  translateTeamGameDetailSchema,
 }
