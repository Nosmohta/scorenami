const getTeam = require('../models/team');

const resolvers = {
  Query: {
    team(obj, args, context) {
      return getTeam(args.options);
    }
  }
};

module.exports = resolvers;
