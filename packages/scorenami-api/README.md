# Scorenami API

Scorenami GraphQL API server.


## Running in development

1. Create `.env` file
2. Add `PRO_FOOTBALL_API_KEY=<api_key>`
3. Run `yarn run start`
4. Go to http://localhost:8000/graphiql


## GraphQL Queries

### Season

```js
query SeasonQuery($year: Int!) {
  season(year: $year) {
    currentYear
    currentWeek {
      ...SeasonWeekDetails
    }
    preSeasonWeeks {
      ...SeasonWeekDetails
    }
    regularSeasonWeeks {
      ...SeasonWeekDetails
    }
    postSeasonWeeks {
      ...SeasonWeekDetails
    }
    allSeasonWeeks {
      ...SeasonWeekDetails
    }
  }
}
```

### Schedule

```js
{
  schedule(options: {year: 2017, week: 3, seasonType: REG}) {
    gameId
    home
    away
    day
    month
    time
    seasonType
    week
    year
    final
    status
    homeScore
    awayScore
  }
}
```

### Game
```js
{
  game(gameId: 2017092100) {
    gameId
    home {
      ...teamGameDetails
    }
    away {
      ...teamGameDetails
    }
    day
    month
    time
    seasonType
    week
    year
    final
    homeScore
    awayScore
  }
}
```

### Plays
```js
{
  plays(options: {gameId: 2017092100, quarter: 2, down: 4}) {
    gameId
    playId
    driveId
    quarter
    down
    time
    yardLine
    yardsToGo
    yardsNet
    possessionTeam
    opponent
    description
    note
  }
}
```

### Team
```js
{
  team(options: { team: BAL, year: 2016, opponent: CIN }) {
    gameId
    team
    opponent
    totalDrives
    totalYards
    passingYards
    runningYards
    penalties
    penaltyYards
    turnovers
    punts
    puntingYards
    puntingAverageYards
  }
}
```


## Fragments

```js
fragment SeasonWeekDetails on SeasonWeek {
  displayName
  seasonType
  weekNumber
}

fragment teamGameDetails on TeamGame {
  team
  opponent
  totalFirstDowns
  totalYards
  passingYards
  rushingYards
  penalties
  penaltyYards
  turnovers
  punts
  puntingYards
  puntingAverageYards
  drives {
    ...drivesDetail
  }
  stats {
    ...allStats
  }
}

fragment allStats on GameStats {
  passing {
    playerId
    name
    attempts
    completions
    yards
    touchdowns
    interceptions
    twoPointAttempts
    twoPointMakes
  }
  rushing {
    playerId
    name
    attempts
    yards
    touchdowns
    long
    longTouchdown
    twoPointAttempts
    twoPointMakes
  }
  kickReturn {
    playerId
    name
    returns
    average
    touchdowns
    long
    longTouchdown
  }
  puntReturn {
    playerId
    name
    returns
    average
    touchdowns
    long
    longTouchdown
  }
  receiving {
    playerId
    name
    receptions
    yards
    touchdowns
    long
    longTouchdown
    twoPointAttempts
    twoPointMakes
  }
  fumbles {
    playerId
    name
    totalFumbles
    recovered
    teamRecovered
    yards
    fumblesLost
  }
  kicking {
    playerId
    name
    attempts
    made
    yards
    percent
    extraPointAttempt
    extraPointMade
    extraPointMissed
    extraPointBlocked
    extraPointTotal
  }
  defense {
    playerId
    name
    tackles
    assistedTackles
    sacks
    interceptions
    forcedFumbles
  }
  punting {
    playerId
    name
    punts
    yards
    average
    insideTwenty
    long
  }
}

fragment drivesDetail on Drive {
  driveId
  quarter
  result
  penaltyYards
  plays {
    ...playsDetail
  }
}

fragment playsDetail on Play {
  gameId
  quarter
  down
  time
  yardLine
  yardsToGo
  yardsNet
  possessionTeam
  opponent
  description
  note
}
```
