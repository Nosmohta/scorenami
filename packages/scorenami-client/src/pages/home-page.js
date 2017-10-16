import React from 'react';

import Header from '../components/header';
import DateSelector from '../components/date-selector';

const HomePage = props => (
  <div className="home-page">
    <Header title="Scorenami" />
    <DateSelector />
  </div>
);

export default HomePage;
