const schema = `
  type Game {
    id: Int!
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
`;

module.exports = schema;
