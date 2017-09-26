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
              className={`game-summary-logo-${away.team.toLowerCase()}`}
              src={getTeamLogo(away.team)}
              alt={away.team.toLowerCase()}
              width="20px"
            />
          </span>
          {nflTeams[away.team].displayName} <strong>{awayScore}</strong>
        </div>
        <div className="game-summary-team" style={gameSummaryTeamStyles}>
          <span className="game-summary-logo" style={logoStyles}>
            <img
              className={`game-summary-logo-${home.team.toLowerCase()}`}
              src={getTeamLogo(home.team)}
              alt={home.team.toLowerCase()}
              width="20px"
            />
          </span>
          {nflTeams[home.team].displayName} <strong>{homeScore}</strong>
        </div>
        {final && <span style={finalStyles}>Final</span>}
      </ListItem>
      <Divider />
    </div>
  );
};

export default GameSummary;
