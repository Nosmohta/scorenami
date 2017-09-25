const getSchedule = require('../models/schedule');

const resolvers = {
  Query: {
    schedule(obj, args, context) {
      return getSchedule(args);
    }
  }
};

module.exports = resolvers;
