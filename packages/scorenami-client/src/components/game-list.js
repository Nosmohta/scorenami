import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import List from 'material-ui/List';

import DateBar from '../components/date-bar';
import Loading from '../components/loading';
import GameSummary from './game-summary';

const linkStyles = {
  textDecoration: 'none'
};

const listStyles = {
  padding: '0'
};

const getCurrentYear = () => {
  const date = new Date();
  return date.getFullYear();
};

class GameList extends Component {
  constructor(props) {
    super(props);
    this.refetchGames = this.refetchGames.bind(this);
    this.state = {
      focusYear: getCurrentYear(),
      focusWeek: null
    };
  }

  refetchGames(event) {
    //handle focus state and recreate [weeks] if new year selected
    const label = event.props.label;
    const dateType = label.match(/([a-z])/i) ? 'Week' : 'Year';
    const dateValue = label.replace(/([a-z, \s])/gi, ($1, $2) => {
      return '';
    });
    const newFocusState = { [`focus${dateType}`]: dateValue };

    this.setState(newFocusState, () => {
      const options = {
        year: this.state.focusYear,
        week: this.state.focusWeek,
        seasonType: 'REG'
      };
      console.log('REFETCH OPTIONS', options);
      this.props.data.refetch({ options });
    });
  }

  render() {
    return (
      <List className="game-list" style={listStyles}>
        <DateBar refetchGames={this.refetchGames} focusState={this.state} />
        {this.props.data.loading && <Loading />}
        {!this.props.data.loading &&
          this.props.data.schedule.map(game => (
            <Link to={`/game/${game.gameId}`} key={game.gameId} style={linkStyles}>
              <GameSummary data={game} />
            </Link>
          ))}
      </List>
    );
  }
}

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
      homeScore
      awayScore
    }
  }
`;

export default graphql(ScheduleQuery, {
  options: {
    variables: {
      options: { year: getCurrentYear(), week: null, seasonType: 'REG' }
    }
  }
})(GameList);
