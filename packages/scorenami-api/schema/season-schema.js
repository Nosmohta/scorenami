const schema = `
  type Season {
    currentWeek: String
    currentYear: String!
    preSeasonWeeks: [String!]!
    regularSeasonWeeks: [String!]!
    postSeasonWeeks:[String!]!
    allSeasonWeeks: [String!]!
  }

  enum SeasonType {
    PRE,
    REG,
    POST
  }
`;

module.exports = schema;
