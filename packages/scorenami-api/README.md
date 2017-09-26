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
    home {
      team
    }
    away {
      team
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

### Game

```js
{
  game(game_id: 2017092100) {
    id
    home {
      ...gameTeamDetails
    }
    away{
      ...gameTeamDetails
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

* Fragment for team details of game
```js
fragment gameTeamDetails on TeamGameDetails {
  team
  totfd
  totyds
  pyds
  ryds
  pen
  penyds
  trnovr
  pt
  ptyds
  ptavg
  drives {
    driveId
    quarter
    result
    plays {
      description
    }
  }
  stats {
    passing {
      playNumber
      name
      attempts
      twoPointAttempts
    }
    receiving {
      name
    }
    punting {
      playNumber
      name
      inside20
    }
  }
}
```

### Plays
```js
{
  plays(options: { gameId: 2017092100, quarter: 2, down:4 }) {
    gameId
    playId
    quarter
    down
    time
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
    totfd
    totyds
    pyds
    ryds
    pen
    penyds
    trnovr
    pt
    ptyds
    ptavg
  }
}
```
