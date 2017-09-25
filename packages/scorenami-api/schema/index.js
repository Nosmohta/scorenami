const { makeExecutableSchema } = require('graphql-tools');
const merge = require('lodash').merge;

const gameSchema = require('./game-schema');
const seasonTypeSchema = require('./season-type-schema');

const gameResolvers = require('../resolvers/game-resolvers');
const scheduleResolvers = require('../resolvers/schedule-resolvers');

const rootSchema = `
  schema {
    query: Query
  }

  type Query {
    schedule(
      year: Int,
      month: Int,
      day: Int,
      time: Int,
      seasonType: SeasonType,
      week: Int,
      final: Boolean
    ): [Game!]!
    game(game_id: Int!): Game!
  }
`;

const schema = [rootSchema, gameSchema, seasonTypeSchema];

const resolvers = merge(gameResolvers, scheduleResolvers);

module.exports = makeExecutableSchema({
  typeDefs: schema,
  resolvers
});
