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

  if (props.data.loading) {
    return <Loading />;
  }

  return (
    <List className="game-list">
      {props.data.schedule.map(game => (
        <Link to={`/game/${game.gameId}`} key={game.gameId} className={linkStyles}>
          <GameSummary data={game} />
        </Link>
      ))}
    </List>
  );
};

const ScheduleQuery = gql`
  query {
    schedule(options: { year: 2017, week: 3, seasonType: REG }) {
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
`;

export default graphql(ScheduleQuery)(GameList);
