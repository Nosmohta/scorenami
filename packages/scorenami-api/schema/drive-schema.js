const schema = `
  type Drive {
    driveId: Int
    quarter: Int
    result: String
    penaltyYards: Int
    yardsGained: Int
    numberOfPlays: Int
    possessionTime: Int
    plays: [Play!]
  }
`;

module.exports = schema;
