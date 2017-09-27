const schema = `
  type Play {
    quarter: Int
    down: Int
    time: Int
    yardLine: String
    yardsToGo: Int
    yardsNet: Int
    possessionTeam: String
    opponent: String
    description: String
    note: String
  }
`;

module.exports = schema;
