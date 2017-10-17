import React from 'react';
import { css } from 'glamor';
import Paper from 'material-ui/Paper';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

const styles = css({
  margin: '0 10px',

  '& .away-stat': {
    fontWeight: 'bold',
    textAlign: 'left !important'
  },

  '& .home-stat': {
    fontWeight: 'bold',
    textAlign: 'right !important'
  },

  '& .stat-name': {
    width: '60%',
    textAlign: 'center !important'
  }
});

const GameDetailSummary = props => {
  const game = props.gameData;

  return (
    <div className="game-detail-summary">
      <Paper className={styles}>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn className="away-stat">{game.away.team}</TableHeaderColumn>
              <TableHeaderColumn className="stat-name" />
              <TableHeaderColumn className="home-stat">{game.home.team}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn className="away-stat">{game.away.totalFirstDowns}</TableRowColumn>
              <TableRowColumn className="stat-name">Total First Downs</TableRowColumn>
              <TableRowColumn className="home-stat">{game.home.totalFirstDowns}</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn className="away-stat">{game.away.totalYards}</TableRowColumn>
              <TableRowColumn className="stat-name">Total Yards</TableRowColumn>
              <TableRowColumn className="home-stat">{game.home.totalYards}</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn className="away-stat">{game.away.passingYards}</TableRowColumn>
              <TableRowColumn className="stat-name">Passing Yards</TableRowColumn>
              <TableRowColumn className="home-stat">{game.home.passingYards}</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn className="away-stat">{game.away.rushingYards}</TableRowColumn>
              <TableRowColumn className="stat-name">Rushing Yards</TableRowColumn>
              <TableRowColumn className="home-stat">{game.home.rushingYards}</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn className="away-stat">{game.away.penalties}</TableRowColumn>
              <TableRowColumn className="stat-name">Penalties</TableRowColumn>
              <TableRowColumn className="home-stat">{game.home.penalties}</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn className="away-stat">{game.away.penaltyYards}</TableRowColumn>
              <TableRowColumn className="stat-name">Penalty Yards</TableRowColumn>
              <TableRowColumn className="home-stat">{game.home.penaltyYards}</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn className="away-stat">{game.away.turnovers}</TableRowColumn>
              <TableRowColumn className="stat-name">Turnovers</TableRowColumn>
              <TableRowColumn className="home-stat">{game.home.turnovers}</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn className="away-stat">{game.away.punts}</TableRowColumn>
              <TableRowColumn className="stat-name">Punts</TableRowColumn>
              <TableRowColumn className="home-stat">{game.home.punts}</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn className="away-stat">{game.away.puntingYards}</TableRowColumn>
              <TableRowColumn className="stat-name">Punting Yards</TableRowColumn>
              <TableRowColumn className="home-stat">{game.home.puntingYards}</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn className="away-stat">{game.away.puntingAverageYards}</TableRowColumn>
              <TableRowColumn className="stat-name">Punting Average Yards</TableRowColumn>
              <TableRowColumn className="home-stat">{game.home.puntingAverageYards}</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default GameDetailSummary;
