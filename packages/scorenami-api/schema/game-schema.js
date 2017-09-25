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

  type GameStats {
    passing: Int
    rushing: Int
    kick_return: Int
    punt_return: Int
    receiving: Int
    fumbles: Int
    kicking: Int
    defense: Int
    punting: Int
  }

  type Drive {
    driveId: Int
    quarter: Int
    result: String
    penyds: Int
    ydsgained: Int
    numplays: Int
    postime: Int
    plays: [Play!]
  }

  type Play {
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

`;

module.exports = schema;
