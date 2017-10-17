const schema = `
  type Season {
    currentYear: Int!
    currentWeek: SeasonWeek
    preSeasonWeeks: [SeasonWeek!]!
    regularSeasonWeeks: [SeasonWeek!]!
    postSeasonWeeks:[SeasonWeek!]!
    allSeasonWeeks: [SeasonWeek!]!
  }

  type SeasonWeek {
    displayName: String!
    seasonType: SeasonType!
    weekNumber: Int!
  }

  enum SeasonType {
    PRE,
    REG,
    POST
  }
`;

module.exports = schema;
