const getTeam = require('../models/teams');

const resolvers = {
  Query: {
    teams(obj, args, context) {
      return getTeam(args);
    }
  }
};

module.exports = resolvers;
