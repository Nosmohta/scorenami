const schema = `
  type Game {
    id: Int!
    home: TeamGameDetails!
    away: TeamGameDetails!
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

  type TeamGameDetails {
    team: String!
    opponent: String
    totfd: Int
    totyds: Int
    pyds: Int
    ryds: Int
    pen: Int
    penyds: Int
    trnovr: Int
    pt: Int
    ptyds: Int
    ptavg: Int
    drives: [Drive!]
    stats: GameStats!
  }
`;

module.exports = schema;
