const schema = `
  type Play {
    quarter: Int
    down: Int
    time: Int
    yrdln: String
    ydstogo: Int
    ydsnet: Int
    posteam: String
    opponent: String
    description: String
    note: String
  }
`;

module.exports = schema;
