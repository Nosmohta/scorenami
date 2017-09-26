const schema = `
  type TeamGameSummary{
    gameId: Int
    team: TeamNames
    opponent: TeamNames
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
  }

  input searchTeamInput {
    gameId: Int
    team: TeamNames!
    opponent: TeamNames
    year: Int
    month: Int
    week: Int
    day: Int
    time: Int
    seasonType: SeasonType
    final: Boolean
  }

  enum TeamNames {
    BAL
    CIN
  }
`;

module.exports = schema;
