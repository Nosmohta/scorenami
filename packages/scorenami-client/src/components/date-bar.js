import React from 'react';
import { withRouter } from 'react-router-dom';

import SwipeBar from './swipe-bar';

const styles = {
  container: {
    display: 'flex row'
  }
};

const currentYear = new Date().getFullYear();

const buildYears = () => {
  return ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'];
};

const buildWeeksForYear = selectedYear => {
  const fullSeasonWeeks = 17;
  const currentYearWeeks = 8;

  return ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'];
};

const DateBar = props => {
  this.state = {
    years: buildYears(),
    weeks: buildWeeksForYear(props.focusState.focusYear)
  };

  return (
    <div style={styles.container}>
      <SwipeBar
        key="years"
        swipeElements={this.state.years}
        refetchGames={selection => props.refetchGames(selection)}
        focusElement={props.focusState.focusYear}
      />
      <SwipeBar
        key="weeks"
        swipeElements={this.state.weeks}
        refetchGames={selection => props.refetchGames(selection)}
        focusElement={props.focusState.focusWeek}
      />
    </div>
  );
};

export default withRouter(DateBar);
