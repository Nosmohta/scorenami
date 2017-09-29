const schema = `
  type Game {
    gameId: Int!
    home: TeamGame!
    away: TeamGame!
    day: Int!
    month: Int!
    time: Int!
    seasonType: SeasonType!
    week: Int!
    year: String!
    final: Int!
    homeScore: Int
    awayScore: Int
  }

  type GameSummary {
    gameId: Int!
    home: String!
    away: String!
    day: Int!
    month: Int!
    time: Int!
    seasonType: SeasonType!
    week: Int!
    year: String!
    final: Int!
    homeScore: Int
    awayScore: Int
  }

  type TeamGame {
    team: String!
    opponent: String
    totalFirstDowns: Int
    totalYards: Int
    passingYards: Int
    rushingYards: Int
    penalties: Int
    penaltyYards: Int
    turnovers: Int
    punts: Int
    puntingYards: Int
    puntingAverageYards: Int
    drives: [Drive!]
    stats: GameStats!
  }
`;

module.exports = schema;
