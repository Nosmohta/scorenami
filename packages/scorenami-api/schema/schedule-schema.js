const schema = `
  type SeasonDetails {
    preseasonWeeks: Int!
  }

  input ScheduleOptionInput {
    year: Int,
    month: Int,
    day: Int,
    time: Int,
    seasonType: SeasonType,
    week: Int,
    final: Boolean
  }
`;

module.exports = schema;
