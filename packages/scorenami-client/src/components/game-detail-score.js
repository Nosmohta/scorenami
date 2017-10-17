import React from 'react';
import glamorous from 'glamorous';

import getTeamLogo from '../utils/get-team-logo';

const ScoreContainer = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  margin: '1em 0.5em',
  fontFamily: 'Roboto, sans-serif'
});

const Logo = glamorous.div({
  width: '20%',
  textAlign: 'center',

  '& img': {
    width: '100%',
    minWidth: '30px',
    maxWidth: '200px'
  }
});

const Score = glamorous.div({
  width: '20%',
  fontSize: '2em',
  fontWeight: 'bold',
  textAlign: 'center'
});

const Time = glamorous.div({
  width: '20%',
  fontSize: '0.8em',
  textAlign: 'center',
  textTransform: 'uppercase'
});

const getGameTime = game => {
  if (game.final === 1) {
    return <div>Final</div>;
  } else {
    const gameDate = new Date(game.time * 1000);

    return (
      <div>
        <div>
          {gameDate.getMonth() + 1}/{gameDate.getDate()}
        </div>
        <div>
          {gameDate.getHours()}:{gameDate.getMinutes()}
        </div>
      </div>
    );
  }
};

const GameDetailScore = props => {
  const game = props.gameData;

  return (
    <ScoreContainer>
      <Logo>
        <img src={getTeamLogo(game.away.team)} alt={game.away.team} />
      </Logo>
      <Score>{game.awayScore}</Score>
      <Time>{getGameTime(game)}</Time>
      <Score>{game.homeScore}</Score>
      <Logo>
        <img src={getTeamLogo(game.home.team)} alt={game.home.team} />
      </Logo>
    </ScoreContainer>
  );
};

export default GameDetailScore;
