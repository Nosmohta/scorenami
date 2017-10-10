const schema = `
  input TeamOptionInput {
    gameId: Int
    team: TeamName!
    opponent: TeamName
    year: Int
    month: Int
    week: Int
    day: Int
    time: Int
    seasonType: SeasonType
    final: Boolean
  }

  enum TeamName {
    ARI
    ATL
    BAL
    BUF
    CAR
    CHI
    CIN
    CLE
    DAL
    DEN
    DET
    GB
    HOU
    IND
    JAC
    JAX
    KC
    LA
    LAC
    MIA
    MIN
    NE
    NO
    NYG
    NYJ
    OAK
    PHI
    PIT
    SEA
    SD
    SF
    STL
    TB
    TEN
    WAS
  }
`;

module.exports = schema;
