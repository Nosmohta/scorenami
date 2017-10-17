import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Loading from '../components/loading';
import GameDetailScore from './game-detail-score';
import GameDetailSummary from './game-detail-summary';

class GameDetail extends React.Component {
  render() {
    return (
      <div className="game-detail">
        {this.props.data.loading ? (
          <Loading />
        ) : (
          <div>
            <GameDetailScore gameData={this.props.data.game} />
            <GameDetailSummary gameData={this.props.data.game} />
          </div>
        )}
      </div>
    );
  }
}

const gameDetailQuery = gql`
  query scheduleQuery($gameId: Int!) {
    game(gameId: $gameId) {
      gameId
      home {
        ...teamGameDetails
      }
      away {
        ...teamGameDetails
      }
      day
      month
      time
      seasonType
      week
      year
      final
      homeScore
      awayScore
    }
  }

  fragment teamGameDetails on TeamGame {
    team
    opponent
    totalFirstDowns
    totalYards
    passingYards
    rushingYards
    penalties
    penaltyYards
    turnovers
    punts
    puntingYards
    puntingAverageYards
  }
`;

export default graphql(gameDetailQuery, {
  options: ({ gameId }) => ({
    variables: { gameId }
  })
})(GameDetail);
