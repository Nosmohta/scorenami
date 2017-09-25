import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import List from 'material-ui/List';

import GameSummary from './game-summary';

const GameList = props => {
  const linkStyles = {
    textDecoration: 'none'
  };

  if (props.data.loading) {
    return <div>Loading</div>;
  }

  return (
    <List className="game-list">
      {props.data.schedule.map(game => (
        <Link to={`/game/${game.id}`} key={game.id} style={linkStyles}>
          <GameSummary data={game} />
        </Link>
      ))}
    </List>
  );
};

const ScheduleQuery = gql`
  query {
    schedule(year: 2017, week: 3, seasonType: REG) {
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
`;

export default graphql(ScheduleQuery)(GameList);
