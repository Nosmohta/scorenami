import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import ReactDOM from 'react-dom';
import { isEqual } from 'lodash';

import SwipeBar from './swipe-bar';
import GameList from './game-list';
import Loading from '../components/loading';

const buildYears = seasonYear => {
  const years = [];
  for (let yr = 2009; yr <= seasonYear; yr++) {
    years.push({
      displayName: yr.toString()
    });
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
      loading: true
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
    const eventType = label.match(/([a-z])/i) ? 'focusWeek' : 'focusYear';

    /*
    * Case: Change in focusWeek.
    */
    if (eventType === 'focusWeek') {
      const newFocusWeek =
        this.state.focusWeek && this.state.focusWeek.displayName === label
          ? { focusWeek: null }
          : { focusWeek: event.props.data };

      this.setState(newFocusWeek);
    }

    /*
    * Case: Change in focusYear.
    */
    if (eventType === 'focusYear') {
      this.setState({
        focusYear: label
      });
      const refetchOptions = {
        year: label
      };

      this.props.data.refetch(refetchOptions);
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextPropsSeason = nextProps.data.season;
    /*
    * Case: First Load of season data is recieved.
    */
    if (nextPropsSeason && this.state.loading) {
      const newState = {
        years:
          this.state.years.length > 0 ? this.state.years : buildYears(nextPropsSeason.currentYear),
        weeks: nextPropsSeason.allSeasonWeeks,
        focusYear: this.state.focusYear
          ? this.state.focusYear
          : nextPropsSeason.currentYear.toString(),
        focusWeek: this.state.focusWeek ? this.state.focusWeek : nextPropsSeason.currentWeek,
        loading: nextProps.data.loading ? true : false
      };

      this.setState(newState);
    }

    /*
    * Case: New and distinct allSeasonWeeks data is recieved.
    */
    if (nextPropsSeason && this.props.data.season) {
      if (!isEqual(this.props.data.season.allSeasonWeeks, nextPropsSeason.allSeasonWeeks)) {
        const newWeeksState = {
          weeks: nextPropsSeason.allSeasonWeeks,
          focusWeek:
            nextPropsSeason.allSeasonWeeks.indexOf(this.state.focusWeek) === -1
              ? null
              : this.state.focusWeek
        };

        this.setState(newWeeksState);
      }
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
          focusElement={{ displayName: this.state.focusYear }}
        />
        <SwipeBar
          key="weeks"
          swipeElements={this.state.weeks}
          refetchGames={selection => this.refetchGames(selection)}
          scrollToFocusElement={this.scrollToFocusElement}
          focusElement={this.state.focusWeek ? this.state.focusWeek : []}
        />
        {data.loading && <Loading />}
        {!data.loading &&
          data.season && (
            <GameList
              focusYear={this.state.focusYear}
              focusWeek={this.state.focusWeek}
              seasonWeeks={data.season.allSeasonWeeks}
            />
          )}
      </div>
    );
  }
}

const SeasonQuery = gql`
  query SeasonQuery($year: Int!) {
    season(year: $year) {
      currentYear
      currentWeek {
        ...SeasonWeekDetails
      }
      allSeasonWeeks {
        ...SeasonWeekDetails
      }
    }
  }

  fragment SeasonWeekDetails on SeasonWeek {
    displayName
    seasonType
    weekNumber
  }
`;

export default graphql(SeasonQuery, {
  options: {
    variables: {
      year: getCalanderYear()
    }
  }
})(DateSelector);
