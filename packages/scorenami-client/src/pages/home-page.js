import React from 'react';

import Header from '../components/header';
import GameList from '../components/game-list';

const HomePage = props => (
  <div className="home-page">
    <Header title="Scorenami" />
    <GameList />
  </div>
);

export default HomePage;
