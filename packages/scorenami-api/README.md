# Scorenami API

Scorenami GraphQL API server.


## Running in development

1. Create `.env` file
2. Add `PRO_FOOTBALL_API_KEY=<api_key>`
3. Run `yarn run start`
4. Go to http://localhost:8000/graphiql


## GraphQL Queries

### Schedule

```js
{
  schedule(year: 2017, week: 3, seasonType: REG) {
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

## Fragments:
```js
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
    playNumber
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
    playNumber
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
    playNumber
    name
    returns
    average
    touchdowns
    long
    longTouchdown
  }
  puntReturn {
    playNumber
    name
    returns
    average
    touchdowns
    long
    longTouchdown
  }
  receiving {
    playNumber
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
    playNumber
    name
    totalFumbles
    recovered
    teamRecovered
    yards
    fumblesLost
  }
  kicking {
    playNumber
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
    playNumber
    name
    tackles
    assistedTackles
    sacks
    interceptions
    forcedFumbles
  }
  punting {
    playNumber
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
