const getPlayerStats = require('../models/players');

const resolvers = {
  Query: {
    playerStats(obj, args, context) {
      return getPlayerStats(args);
    }
  }
};

module.exports = resolvers;
