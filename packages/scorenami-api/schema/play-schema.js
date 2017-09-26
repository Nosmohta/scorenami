const schema = `
  type Play {
    gameId: Int
    playId: Int
    quarter: Int
    down: Int
    time: Int
    yrdln: String
    ydstogo: Int
    ydsnet: Int
    posteam: String
    opponent: String
    description: String
    note: String
  }

  input SearchPlayInput {
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
    team: String
    opponent: String
  }
`;

module.exports = schema;
