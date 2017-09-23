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
query {
  schedule(year:2017, week:3, seasonType:REG) {
    id
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
