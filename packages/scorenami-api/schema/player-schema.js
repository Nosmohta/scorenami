const schema = `
  type PlayerStats {
    games: [PlayerGameStats]
  }

  type PlayerGameStats {
    gameId: Int!
    passing: PassingStats
    rushing: RushingStats
    kickReturn: KickReturnStats
    puntReturn: PuntReturnStats
    receiving: ReceivingStats
    fumbles: FumblesStats
    kicking: KickingStats
    defense: defenseStats
    punting: PuntingStats
  }

  input PlayerStatsInput {
    gameId: Int
    team: TeamName
    opponent: TeamName
    year: Int
    month: Int
    week: Int
    day: Int
    time: Int
    seasonType: SeasonType
    final: Boolean
  }

  enum StatsTypes {
    offense
    defense
    passing
    rushing
    receiving
    kicking
    punting
    returning
  }
`;

module.exports = schema;
