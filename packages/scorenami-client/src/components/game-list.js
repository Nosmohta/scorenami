import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import List from 'material-ui/List';

import GameSummary from './game-summary';

const styles = {
  link: {
    textDecoration: 'none'
  },
  list: {
    padding: '0'
  }
};

const parseWeekType = focusWeek => {
  if (!focusWeek) {
    return null;
  } else if (focusWeek.match(/pre/gi)) {
    return 'PRE';
  } else if (focusWeek.match(/week/gi)) {
    return 'REG';
  } else {
    return 'POST';
  }
};

const parseWeekValue = focusWeek => {
  if (focusWeek) {
    return focusWeek.replace(/([a-z, /s])/gi, ($1, $2) => {
      return '';
    });
  } else {
    return null;
  }
};

const GameList = props => {
  const { data } = props;

  return (
    <List className="game-list" style={styles.list}>
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
  options: ({ focusYear, focusWeek }) => {
    return {
      variables: {
        options: {
          year: focusYear,
          week: parseWeekValue(focusWeek),
          seasonType: parseWeekType(focusWeek)
        }
      }
    };
  }
})(GameList);
