import React from 'react';
import { css } from 'glamor';
import ListItem from 'material-ui/List/ListItem';
import Divider from 'material-ui/Divider';
import moment from 'moment';

import getTeamLogo from '../utils/get-team-logo';
import nflTeams from '../data/nfl-teams';

const GameSummary = props => {
  const { home, away, homeScore, awayScore, status, time } = props.data;
  const localGameTime = moment(time * 1000).local();

  const scoreStyles = css({
    minHeight: '1.2em',

    '& .game-summary-logo': {
      marginRight: '10px'
    }
  });

  const liveStyles = css({
    float: 'right',
    marginTop: '-32px'
  });

  const finalStyles = css({
    float: 'right',
    marginTop: '-32px'
  });

  const scheduledStyles = css({
    float: 'right',
    textAlign: 'right',
    marginTop: '-32px'
  });

  return (
    <div className="game-summary">
      <ListItem className="game-summary-item">
        <div className={scoreStyles}>
          <span className="game-summary-logo">
            <img
              className={`game-summary-logo-${away.toLowerCase()}`}
              src={getTeamLogo(away)}
              alt={away.toLowerCase()}
              width="20px"
            />
          </span>
          {nflTeams[away].displayName} <strong>{awayScore}</strong>
        </div>
        <div className={scoreStyles}>
          <span className="game-summary-logo">
            <img
              className={`game-summary-logo-${home.toLowerCase()}`}
              src={getTeamLogo(home)}
              alt={home.toLowerCase()}
              width="20px"
            />
          </span>
          {nflTeams[home].displayName} <strong>{homeScore}</strong>
        </div>
        {status === 'live' && <span className={liveStyles}>Live</span>}
        {status === 'final' && <span className={finalStyles}>Final</span>}
        {status === 'scheduled' && (
          <span className={scheduledStyles}>
            <div>{localGameTime.format('ddd M/D')}</div>
            <div>{localGameTime.format('h:mm A')}</div>
          </span>
        )}
      </ListItem>
      <Divider />
    </div>
  );
};

export default GameSummary;
