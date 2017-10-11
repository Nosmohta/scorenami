const getSeasonDetails = require('../models/season');

const resolvers = {
  Query: {
    season(obj, args, context) {
      return getSeasonDetails(args);
    }
  }
};

module.exports = resolvers;
