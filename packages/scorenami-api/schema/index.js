const { makeExecutableSchema } = require('graphql-tools');
const merge = require('lodash').merge;

const driveSchema = require('./drive-schema');
const gameSchema = require('./game-schema');
const playSchema = require('./play-schema');
const seasonTypeSchema = require('./season-type-schema');
const statsSchema = require('./stats-schema');
const teamSchema = require('./team-schema');

const gameResolvers = require('../resolvers/game-resolvers');
const playsResolvers = require('../resolvers/plays-resolvers');
const scheduleResolvers = require('../resolvers/schedule-resolvers');
const teamResolvers = require('../resolvers/team-resolvers');

const rootSchema = `
  schema {
    query: Query
  }

  type Query {
    game(gameId: Int!): Game!
    plays(options: SearchPlayInput!): [Play]
    schedule(
      year: Int,
      month: Int,
      day: Int,
      time: Int,
      seasonType: SeasonType,
      week: Int,
      final: Boolean
    ): [Game!]!
    team(options: searchTeamInput): [TeamGameSummary]
  }
`;

const schema = [rootSchema, driveSchema, gameSchema, playSchema, seasonTypeSchema, statsSchema, teamSchema];

const resolvers = merge(gameResolvers, playsResolvers, scheduleResolvers, teamResolvers);

module.exports = makeExecutableSchema({
  typeDefs: schema,
  resolvers
});
