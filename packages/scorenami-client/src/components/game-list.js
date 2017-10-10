import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import List from 'material-ui/List';
import moment from 'moment';

import DateBar from '../components/date-bar';
import Loading from '../components/loading';
import GameSummary from './game-summary';

const styles = {
  link: {
    textDecoration: 'none'
  },
  list: {
    padding: '0'
  }
};

const buildYears = () => {
  const years = [];
  for (let yr = 2009; yr <= getCurrentSeasonYear(); yr++) {
    years.push(yr.toString());
  }
  return years;
};

const buildWeeksForFullSeason = () => {
  const weeks = [];
  for (let wk = 1; wk <= 17; wk++) {
    weeks.push(`Week ${wk}`);
  }

  return weeks;
};

const getCurrentSeasonYear = () => {
  const date = new Date();

  return date.getFullYear().toString();
};

const getCurrentSeasonWeek = () => {
  const seasonOpenerDate = moment('20170907');
  const today = moment();
  const weeksSinceOpener = today.diff(seasonOpenerDate, 'weeks') + 1;
  return weeksSinceOpener > 0 && weeksSinceOpener <= 17 ? weeksSinceOpener.toString() : null;
};

class GameList extends Component {
  constructor(props) {
    super(props);
    this.refetchGames = this.refetchGames.bind(this);
    this.state = {
      years: buildYears(),
      weeks: buildWeeksForFullSeason(),
      focusYear: getCurrentSeasonYear(),
      focusWeek: getCurrentSeasonWeek()
    };
  }

  scrollToFocusElement(elementInFocus) {
    const node = ReactDOM.findDOMNode(elementInFocus);
    if (node) {
      node.scrollIntoView({ block: 'nearest' });
    }
  }

  refetchGames(event) {
    const label = event.props.label;
    const dateType = label.match(/([a-z])/i) ? 'focusWeek' : 'focusYear';
    const dateValue = label.replace(/([a-z, \s])/gi, ($1, $2) => '');
    const newState =
      this.state[dateType] === dateValue && dateType === 'focusWeek'
        ? { focusWeek: null }
        : { [dateType]: dateValue };

    this.setState(newState, () => {
      const options = {
        year: this.state.focusYear,
        week: this.state.focusWeek,
        seasonType: 'REG'
      };
      this.props.data.refetch({ options });
    });
  }

  render() {
    return (
      <List className="game-list" style={styles.list}>
        <DateBar
          refetchGames={this.refetchGames}
          scrollToFocusElement={this.scrollToFocusElement}
          focusState={this.state}
          years={this.state.years}
          weeks={this.state.weeks}
        />
        {this.props.data.loading && <Loading />}
        {!this.props.data.loading &&
          this.props.data.schedule.map(game => (
            <Link to={`/game/${game.gameId}`} key={game.gameId} style={styles.link}>
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
      options: { year: getCurrentSeasonYear(), week: getCurrentSeasonWeek(), seasonType: 'REG' }
    }
  }
})(GameList);
