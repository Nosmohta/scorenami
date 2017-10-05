const { makeExecutableSchema } = require('graphql-tools');
const merge = require('lodash').merge;

const driveSchema = require('./drive-schema');
const gameSchema = require('./game-schema');
const playSchema = require('./play-schema');
const seasonTypeSchema = require('./season-type-schema');
const scheduleSchema = require('./schedule-schema');
const statsSchema = require('./stats-schema');

const gameResolvers = require('../resolvers/game-resolvers');
const playsResolvers = require('../resolvers/plays-resolvers');
const scheduleResolvers = require('../resolvers/schedule-resolvers');

const rootSchema = `
  schema {
    query: Query
  }

  type Query {
    game(gameId: Int!): Game!
    plays(options: PlayOptionInput!): [Play]
    schedule(options: ScheduleOptionInput!): [GameSummary!]!
    game(gameId: Int!): Game!
  }
`;

const schema = [
  rootSchema,
  driveSchema,
  gameSchema,
  playSchema,
  seasonTypeSchema,
  scheduleSchema,
  statsSchema
];

const resolvers = merge(gameResolvers, playsResolvers, scheduleResolvers);

module.exports = makeExecutableSchema({
  typeDefs: schema,
  resolvers
});
