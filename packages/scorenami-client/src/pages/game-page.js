import React from 'react';

import Header from '../components/header';
import GameDetail from '../components/game-detail';

const GamePage = props => (
  <div className="game-page">
    <Header title="Game Detail" backButton />
    <GameDetail gameId={props.match.params.id} />
  </div>
);

export default GamePage;
