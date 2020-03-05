// jest.config.js
module.exports = {
  testMatch: [
    "**/?(*.)+(spec|test|unit)?(.*).js?(x)"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ]
};
