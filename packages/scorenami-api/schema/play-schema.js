const schema = `
  type Play {
    gameId: Int
    playId: Int
    driveId: Int
    quarter: Int
    down: Int
    time: Int
    yardLine: String
    yardsToGo: Int
    yardsNet: Int
    possessionTeam: TeamName
    opponent: TeamName
    description: String
    note: String
  }

  input PlayOptionInput {
    gameId: Int
    playerId: String
    quarter: Int
    down: Int
    year: Int
    month: Int
    week: Int
    day: Int
    time: Int
    seasonType: SeasonType
    final: Boolean
    team: TeamName
    opponent: TeamName
  }
`;

module.exports = schema;
