import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { css } from 'glamor';
import List from 'material-ui/List';

import Loading from './loading';
import GameSummary from './game-summary';

const GameList = props => {
  const linkStyles = css({
    textDecoration: 'none'
  });
  const { data } = props;

  if (props.data.loading) {
    return <Loading />;
  }

  return (
    <List className="game-list">
      {data.loading && <Loading />}
      {!data.loading &&
        data.schedule &&
        data.schedule.map(game => {
          if (game.status === 'live' || game.status === 'final') {
            return (
              <Link to={`/game/${game.gameId}`} key={game.gameId} className={linkStyles}>
                <GameSummary key={game.gameId} data={game} />
              </Link>
            );
          } else {
            return <GameSummary key={game.gameId} data={game} />;
          }
        })}
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
