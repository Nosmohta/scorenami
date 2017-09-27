const getPlays = require('../models/plays');

const resolvers = {
  Query: {
    plays(obj, args, context) {
      return getPlays(args);
    }
  }
};

module.exports = resolvers;
