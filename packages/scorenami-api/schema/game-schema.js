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
    home: TeamName
    away: TeamName
    day: Int!
    month: Int!
    time: Int!
    seasonType: SeasonType!
    week: Int!
    year: String!
    final: Int!
    status: GameStatus
    homeScore: Int
    awayScore: Int
  }

  type TeamGame {
    team: TeamName
    opponent: TeamName
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

  type TeamGameSummary{
    gameId: Int
    team: TeamName
    opponent: TeamName
    totalFirstDowns: Int
    totalYards: Int
    passingYards: Int
    runningYards: Int
    penalties: Int
    penaltyYards: Int
    turnovers: Int
    punts: Int
    puntingYards: Int
    puntingAverageYards: Int
  }

  enum GameStatus {
    final
    scheduled
    live
  }
`;

module.exports = schema;
