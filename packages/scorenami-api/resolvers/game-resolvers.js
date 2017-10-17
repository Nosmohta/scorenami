const getGame = require('../models/game');

const resolvers = {
  Query: {
    game(obj, args, context) {
      return getGame(args);
    }
  }
};

module.exports = resolvers;
