import React from 'react';
import { withRouter } from 'react-router-dom';

import SwipeBar from './swipe-bar';

const DateBar = props => {
  return (
    <div className="date-bar">
      <SwipeBar
        key="years"
        swipeElements={props.years}
        refetchGames={selection => props.refetchGames(selection)}
        scrollToFocusElement={props.scrollToFocusElement}
        focusElement={props.focusState.focusYear}
      />
      <SwipeBar
        key="weeks"
        swipeElements={props.weeks}
        refetchGames={selection => props.refetchGames(selection)}
        scrollToFocusElement={props.scrollToFocusElement}
        focusElement={props.focusState.focusWeek}
      />
    </div>
  );
};

export default withRouter(DateBar);
