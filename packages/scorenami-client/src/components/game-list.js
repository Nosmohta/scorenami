import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import List from 'material-ui/List';
import _ from 'lodash';

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

const parseWeekValue = (focusWeek, seasonWeeks) => {
  if (!focusWeek) {
    return null;
  } else {
    const indexOfFocusWeek = _.findIndex(seasonWeeks, { displayName: focusWeek });

    return seasonWeeks[indexOfFocusWeek].weekNumber;
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
          week: parseWeekValue(focusWeek, seasonWeeks),
          seasonType: parseWeekType(focusWeek, seasonWeeks)
        }
      }
    };
  }
})(GameList);
