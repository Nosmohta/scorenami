const schema = `
type GameStats {
  passing: [PassingStats]
  rushing: [RushingStats]
  kickReturn: [ReturnStats]
  puntReturn: [ReturnStats]
  receiving: [ReceivingStats]
  fumbles: [FumblesStats]
  kicking: [KickingStats]
  defense: [DefenceStats]
  punting: [PuntingStats]
}

type PassingStats {
  playNumber: String
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
  playNumber: String
  name: String
  attempts: Int
  yards: Int
  touchdowns: Int
  long: Int
  longTouchdown: Int
  twoPointAttempts: Int
  twoPointMakes: Int
}

type ReturnStats {
  playNumber: String
  name: String
  returns: Int
  average: Int
  touchdowns: Int
  long: Int
  longTouchdown: Int
}

type ReceivingStats {
  playNumber: String
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
  playNumber: String
  name: String
  totalFumbles: Int
  recovered: Int
  teamRecovered: Int
  yards: Int
  fumblesLost: Int
}

type KickingStats {
  playNumber: String
  name: String
  attempts: Int
  made: Int
  yards: Int
  percent: Int,
  xpAttempt: Int
  xpMade: Int
  xpMissed: Int
  xpBlocked: Int
  xpTotal: Int
}

type DefenceStats {
  playNumber: String
  name: String
  tackles: Int
  assisted_tackles: Int
  sacks: Int
  interceptions: Int
  forced_fumbles: Int
}

type PuntingStats {
  playNumber: String
  name: String
  punts: Int
  yards: Int
  average: Int
  inside20: Int
  long: Int
}
`;

module.exports = schema;
