import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import List from 'material-ui/List';

import GameSummary from './game-summary';
import Loading from '../components/loading';

const styles = {
  link: {
    textDecoration: 'none'
  },
  list: {
    padding: '0'
  }
};

const GameList = props => {
  const { data } = props;

  return (
    <List className="game-list" style={styles.list}>
      {data.loading && <Loading />}
      {!data.loading &&
        data.schedule &&
        data.schedule.map(game => (
          <Link to={`/game/${game.gameId}`} key={game.gameId} style={styles.link}>
            <GameSummary data={game} />
          </Link>
        ))}
    </List>
  );
};

const ScheduleQuery = gql`
  query ScheduleQuery($options: ScheduleOptionInput!) {
    schedule(options: $options) {
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
`;

export default graphql(ScheduleQuery, {
  options: ({ focusYear, focusWeek, seasonWeeks }) => {
    return {
      variables: {
        options: {
          year: focusYear,
          week: focusWeek && focusWeek.weekNumber ? focusWeek.weekNumber : null,
          seasonType: focusWeek && focusWeek.seasonType ? focusWeek.seasonType : null
        }
      }
    };
  }
})(GameList);
