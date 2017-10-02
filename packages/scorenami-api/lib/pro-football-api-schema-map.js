const proFootballApiSchemaMap = {
  drive: {
    drive_id: 'driveId',
    quarter: 'quarter',
    result: 'result',
    penyds: 'penaltyYards',
    ydsgained: 'yardsGained',
    numplays: 'numberOfPlays',
    postime: 'possessionTime',
    plays: 'plays'
  },
  game: {
    nfl_id: 'gameId',
    home: 'home',
    away: 'away',
    day: 'day',
    month: 'month',
    time: 'time',
    season_type: 'seasonType',
    week: 'week',
    year: 'year',
    final: 'final',
    home_score: 'homeScore',
    away_score: 'awayScore'
  },
  gameSummary: {
    id: 'gameId',
    home: 'home',
    away: 'away',
    day: 'day',
    month: 'month',
    time: 'time',
    season_type: 'seasonType',
    week: 'week',
    year: 'year',
    final: 'final',
    home_score: 'homeScore',
    away_score: 'awayScore'
  },
  teamGame: {
    team: 'team',
    opponent: 'opponent',
    totfd: 'totalFirstDowns',
    totyds: 'totalYards',
    pyds: 'passingYards',
    ryds: 'rushingYards',
    pen: 'penalties',
    penyds: 'penaltyYards',
    trnovr: 'turnovers',
    pt: 'punts',
    ptyds: 'puntingYards',
    ptavg: 'puntingAverageYards',
    drives: 'drives',
    stats: 'stats'
  },
  play: {
    quarter: 'quarter',
    down: 'down',
    time: 'time',
    yrdln: 'yardLine',
    ydstogo: 'yardsToGo',
    ydsnet: 'yardsNet',
    posteam: 'possessionTeam',
    opponent: 'opponent',
    description: 'description',
    note: 'note'
  },
  passing: {
    playNumber: 'playNumber',
    name: 'name',
    attempts: 'attempts',
    completions: 'completions',
    yards: 'yards',
    touchdowns: 'touchdowns',
    interceptions: 'interceptions',
    two_point_attempts: 'twoPointAttempts',
    two_point_makes: 'twoPointMakes'
  },
  rushing: {
    playNumber: 'playNumber',
    name: 'name',
    attempts: 'attempts',
    yards: 'yards',
    touchdowns: 'touchdowns',
    long: 'long',
    long_touchdown: 'longTouchdown',
    two_point_attempts: 'twoPointAttempts',
    two_point_makes: 'twoPointMakes'
  },
  return: {
    playNumber: 'playNumber',
    name: 'name',
    returns: 'returns',
    average: 'average',
    touchdowns: 'touchdowns',
    long: 'long',
    long_touchdown: 'longTouchdown'
  },
  receiving: {
    playNumber: 'playNumber',
    name: 'name',
    receptions: 'receptions',
    yards: 'yards',
    touchdowns: 'touchdowns',
    long: 'long',
    long_touchdown: 'longTouchdown',
    two_point_attempts: 'twoPointAttempts',
    two_point_makes: 'twoPointMakes'
  },
  fumbles: {
    playNumber: 'playNumber',
    name: 'name',
    total_fumbles: 'totalFumbles',
    recovered: 'recovered',
    team_recovered: 'teamRecovered',
    yards: 'yards',
    fumbles_lost: 'fumblesLost'
  },
  kicking: {
    playNumber: 'playNumber',
    name: 'name',
    attempts: 'attempts',
    made: 'made',
    yards: 'yards',
    percent: 'percent',
    xp_attempt: 'extraPointAttempt',
    xp_made: 'extraPointMade',
    xp_missed: 'extraPointMissed',
    xp_blocked: 'extraPointBlocked',
    xp_total: 'extraPointTotal'
  },
  defense: {
    playNumber: 'playNumber',
    name: 'name',
    tackles: 'tackles',
    assisted_tackles: 'assistedTackles',
    sacks: 'sacks',
    interceptions: 'interceptions',
    forced_fumbles: 'forcedFumbles'
  },
  punting: {
    playNumber: 'playNumber',
    name: 'name',
    punts: 'punts',
    yards: 'yards',
    average: 'average',
    inside_20: 'insideTwenty',
    long: 'long'
  }
};

module.exports = proFootballApiSchemaMap;
