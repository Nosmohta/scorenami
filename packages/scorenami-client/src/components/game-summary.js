import React from 'react';
import ListItem from 'material-ui/List/ListItem';
import Divider from 'material-ui/Divider';

import nflTeams from '../data/nfl-teams';

const getTeamLogo = shortName => `/assets/img/nfl/logos/${shortName.toLowerCase()}.svg`;

const GameSummary = props => {
  const { home, away, homeScore, awayScore } = props.data;
  const final = props.data.final === 1 ? true : false;

  const gameSummaryTeamStyles = {
    minHeight: '1.2em'
  };

  const logoStyles = {
    marginRight: '10px'
  };

  const finalStyles = {
    float: 'right',
    marginTop: '-32px'
  };

  return (
    <div className="game-summary">
      <ListItem className="game-summary-item">
        <div className="game-summary-team" style={gameSummaryTeamStyles}>
          <span className="game-summary-logo" style={logoStyles}>
            <img
              className={`game-summary-logo-${away.toLowerCase()}`}
              src={getTeamLogo(away)}
              alt={away.toLowerCase()}
              width="20px"
            />
          </span>
          {nflTeams[away].displayName} <strong>{awayScore}</strong>
        </div>
        <div className="game-summary-team" style={gameSummaryTeamStyles}>
          <span className="game-summary-logo" style={logoStyles}>
            <img
              className={`game-summary-logo-${home.toLowerCase()}`}
              src={getTeamLogo(home)}
              alt={home.toLowerCase()}
              width="20px"
            />
          </span>
          {nflTeams[home].displayName} <strong>{homeScore}</strong>
        </div>
        {final && <span style={finalStyles}>Final</span>}
      </ListItem>
      <Divider />
    </div>
  );
};

export default GameSummary;
