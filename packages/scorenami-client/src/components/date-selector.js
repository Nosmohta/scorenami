import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import ReactDOM from 'react-dom';

import SwipeBar from './swipe-bar';
import GameList from './game-list';
import Loading from '../components/loading';

const buildYears = seasonYear => {
  const years = [];
  for (let yr = 2009; yr <= seasonYear; yr++) {
    years.push(yr.toString());
  }
  return years;
};

const getCalanderYear = () => {
  const date = new Date();

  return date.getFullYear().toString();
};

class DateSelector extends Component {
  constructor(props) {
    super(props);
    this.refetchGames = this.refetchGames.bind(this);
    this.state = {
      years: [],
      weeks: [],
      focusYear: null,
      focusWeek: null,
      loading: props.data.loading ? true : false
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
    const newState =
      this.state[dateType] === label && dateType === 'focusWeek'
        ? { focusWeek: null }
        : { [dateType]: label };

    this.setState(newState);
  }

  componentWillReceiveProps(nextProps) {
    const { season } = nextProps.data;

    if (season && this.state.loading) {
      this.setState({
        years: buildYears(season.currentYear),
        weeks: season.allSeasonWeeks,
        focusYear: season.currentYear,
        focusWeek: season.currentWeek,
        loading: nextProps.data.loading ? true : false
      });
    }
  }

  render() {
    const { data } = this.props;

    return (
      <div className="date-selector">
        <SwipeBar
          key="years"
          swipeElements={this.state.years}
          refetchGames={selection => this.refetchGames(selection)}
          scrollToFocusElement={this.scrollToFocusElement}
          focusElement={this.state.focusYear}
        />
        <SwipeBar
          key="weeks"
          swipeElements={this.state.weeks}
          refetchGames={selection => this.refetchGames(selection)}
          scrollToFocusElement={this.scrollToFocusElement}
          focusElement={this.state.focusWeek}
        />
        <div>
          {data.loading && <Loading />}
          {!data.loading &&
            data.season && (
              <GameList focusYear={this.state.focusYear} focusWeek={this.state.focusWeek} />
            )}
        </div>
      </div>
    );
  }
}

const SeasonQuery = gql`
  query SeasonQuery($year: Int!) {
    season(year: $year) {
      currentWeek
      currentYear
      preSeasonWeeks
      regularSeasonWeeks
      postSeasonWeeks
      allSeasonWeeks
    }
  }
`;

export default graphql(SeasonQuery, {
  options: {
    variables: {
      year: getCalanderYear()
    }
  }
})(DateSelector);
