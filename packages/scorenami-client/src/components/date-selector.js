import React from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { isEqual, find } from 'lodash';

import SwipeBar from './swipe-bar';
import GameList from './game-list';
import Loading from '../components/loading';

const buildYears = seasonYear => {
  const years = [];
  for (let year = 2009; year <= seasonYear; year++) {
    years.push({
      displayName: year.toString()
    });
  }
  return years;
};

const getCalanderYear = () => {
  const date = new Date();

  return date.getFullYear().toString();
};

class DateSelector extends React.Component {
  constructor(props) {
    super(props);
    this.fetchGames = this.fetchGames.bind(this);
    this.state = {
      years: [],
      weeks: [],
      selectedYear: null,
      selectedWeek: null,
      loading: true
    };
  }

  scrollToFocusElement(elementInFocus) {
    const node = ReactDOM.findDOMNode(elementInFocus);
    if (node) {
      node.scrollIntoView({ block: 'nearest' });
    }
  }

  fetchGames(event) {
    const label = event.props.label;
    const eventType = event.props.type === 'week' ? 'selectedWeek' : 'selectedYear';

    // Case: Change in selectedWeek.
    if (eventType === 'selectedWeek') {
      const newFocusWeek =
        this.state.selectedWeek && this.state.selectedWeek.displayName === label
          ? { selectedWeek: null }
          : { selectedWeek: event.props.data };

      this.setState(newFocusWeek);
    }

    // Case: Change in selectedYear.
    if (eventType === 'selectedYear') {
      this.setState({
        selectedYear: label
      });
      const refetchOptions = {
        year: label
      };

      this.props.data.refetch(refetchOptions);
    }
  }

  componentWillReceiveProps(nextProps) {
    // Case: First Load of season data is recieved.
    if (nextProps.data.season && this.state.loading) {
      const generateNewState = (prevState, props) => {
        const propsSeason = props.data.season;
        return {
          years: prevState.years.length > 0 ? prevState.years : buildYears(propsSeason.currentYear),
          weeks: propsSeason.allSeasonWeeks,
          selectedYear: prevState.selectedYear
            ? prevState.selectedYear
            : propsSeason.currentYear.toString(),
          selectedWeek: prevState.selectedWeek ? prevState.selectedWeek : propsSeason.currentWeek,
          loading: nextProps.data.loading ? true : false
        };
      };

      this.setState(generateNewState);
    }

    // Case: New and distinct allSeasonWeeks data is recieved.
    if (nextProps.data.season && this.props.data.season) {
      if (!isEqual(this.props.data.season.allSeasonWeeks, nextProps.data.season.allSeasonWeeks)) {
        const generateWeeksNewState = (prevState, props) => {
          const propsSeason = nextProps.data.season;

          return {
            weeks: propsSeason.allSeasonWeeks,
            selectedWeek:
              prevState.selectedWeek &&
              find(propsSeason.allSeasonWeeks, { displayName: prevState.selectedWeek.displayName })
                ? prevState.selectedWeek
                : null
          };
        };

        this.setState(generateWeeksNewState);
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
          fetchGames={selection => this.fetchGames(selection)}
          scrollToFocusElement={this.scrollToFocusElement}
          focusElement={{ displayName: this.state.selectedYear }}
          type="year"
        />
        <SwipeBar
          key="weeks"
          swipeElements={this.state.weeks}
          fetchGames={selection => this.fetchGames(selection)}
          scrollToFocusElement={this.scrollToFocusElement}
          focusElement={this.state.selectedWeek ? this.state.selectedWeek : []}
          type="week"
        />
        {data.loading && <Loading />}
        {!data.loading &&
          data.season && (
            <GameList
              selectedYear={this.state.selectedYear}
              selectedWeek={this.state.selectedWeek}
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
