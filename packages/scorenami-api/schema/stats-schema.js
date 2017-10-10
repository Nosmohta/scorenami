const schema = `
  type GameStats {
    passing: [PassingStats]
    rushing: [RushingStats]
    kickReturn: [KickReturnStats]
    puntReturn: [PuntReturnStats]
    receiving: [ReceivingStats]
    fumbles: [FumblesStats]
    kicking: [KickingStats]
    defense: [defenseStats]
    punting: [PuntingStats]
  }

  type PassingStats {
    playerId: String
    name: String
    attempts: Int
    completions: Int
    yards: Int
    touchdowns: Int
    interceptions: Int
    twoPointAttempts: Int
    twoPointMakes: Int
  }

  type RushingStats {
    playerId: String
    name: String
    attempts: Int
    yards: Int
    touchdowns: Int
    long: Int
    longTouchdown: Int
    twoPointAttempts: Int
    twoPointMakes: Int
  }

  type KickReturnStats {
    playerId: String
    name: String
    returns: Int
    average: Int
    touchdowns: Int
    long: Int
    longTouchdown: Int
  }

  type PuntReturnStats {
    playerId: String
    name: String
    returns: Int
    average: Int
    touchdowns: Int
    long: Int
    longTouchdown: Int
  }

  type ReceivingStats {
    playerId: String
    name: String
    receptions: Int
    yards: Int
    touchdowns: Int
    long: Int
    longTouchdown: Int
    twoPointAttempts: Int
    twoPointMakes: Int
  }

  type FumblesStats {
    playerId: String
    name: String
    totalFumbles: Int
    recovered: Int
    teamRecovered: Int
    yards: Int
    fumblesLost: Int
  }

  type KickingStats {
    playerId: String
    name: String
    attempts: Int
    made: Int
    yards: Int
    percent: Int
    extraPointAttempt: Int
    extraPointMade: Int
    extraPointMissed: Int
    extraPointBlocked: Int
    extraPointTotal: Int
  }

  type defenseStats {
    playerId: String
    name: String
    tackles: Int
    assistedTackles: Int
    sacks: Int
    interceptions: Int
    forcedFumbles: Int
  }

  type PuntingStats {
    playerId: String
    name: String
    punts: Int
    yards: Int
    average: Int
    insideTwenty: Int
    long: Int
  }
`;

module.exports = schema;
