import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from '../pages/home-page';
import GamePage from '../pages/game-page';

import '../css/index.css';

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div className="App">
            <Route exact path="/" component={HomePage} />
            <Route path="/game/:id" component={GamePage} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
