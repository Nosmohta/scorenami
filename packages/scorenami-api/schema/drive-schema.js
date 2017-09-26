const schema = `
  type Drive {
    driveId: Int
    quarter: Int
    result: String
    penyds: Int
    ydsgained: Int
    numplays: Int
    postime: Int
    plays: [Play!]
  }
`;

module.exports = schema;
