const { makeExecutableSchema } = require('graphql-tools');
const merge = require('lodash').merge;

const driveSchema = require('./drive-schema');
const gameSchema = require('./game-schema');
const playSchema = require('./play-schema');
const playerSchema = require('./player-schema');
const seasonSchema = require('./season-schema');
const scheduleSchema = require('./schedule-schema');
const statsSchema = require('./stats-schema');
const teamSchema = require('./team-schema');

const gameResolvers = require('../resolvers/game-resolvers');
const playsResolvers = require('../resolvers/plays-resolvers');
const playersResolvers = require('../resolvers/players-resolvers');
const scheduleResolvers = require('../resolvers/schedule-resolvers');
const seasonResolvers = require('../resolvers/season-resolvers');
const teamsResolvers = require('../resolvers/teams-resolvers');

const rootSchema = `
  schema {
    query: Query
  }

  type Query {
    game(gameId: Int!): Game!
    plays(options: PlayOptionInput!): [Play]
    playerStats(
      playerName: String!,
      statsType: StatsTypes!,
      options: PlayerStatsInput
    ): PlayerStats
    schedule(options: ScheduleOptionInput!): [GameSummary!]!
    season(year: Int!): Season
    teams(options: TeamOptionInput): [TeamGameSummary]
  }
`;

const schema = [
  rootSchema,
  driveSchema,
  gameSchema,
  playSchema,
  playerSchema,
  seasonSchema,
  scheduleSchema,
  statsSchema,
  teamSchema
];

const resolvers = merge(
  gameResolvers,
  playsResolvers,
  playersResolvers,
  scheduleResolvers,
  seasonResolvers,
  teamsResolvers
);

module.exports = makeExecutableSchema({
  typeDefs: schema,
  resolvers
});
