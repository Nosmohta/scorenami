require('dotenv').config();

const express = require('express');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { printSchema } = require('graphql/utilities/schemaPrinter');
const bodyParser = require('body-parser');
const cors = require('cors');
const chalk = require('chalk');
const logger = require('morgan');

const schema = require('./schema');

const PORT = process.env.PORT || 8000;

const app = express();

const whitelist = process.env.ORIGINS ? process.env.ORIGINS.split(',') : [];

var corsOptions = {
  origin: (origin, callback) => {
    if (!whitelist.length || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use('/graphql', cors(corsOptions), bodyParser.json(), graphqlExpress({ schema }));

if (process.env.NODE_ENV !== 'production') {
  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql'
    })
  );

  app.use('/schema', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(printSchema(schema));
  });
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('combined'));

app.listen(PORT, () => {
  console.log(chalk.green(`API server listening on http://localhost:${PORT}`));
});
