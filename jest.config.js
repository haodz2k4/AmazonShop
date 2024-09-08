/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  testMatch: ["**/?(*.)+(test).ts"],
  moduleFileExtensions: [
    'js',
    'ts',     
    'json',
    'node'     
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',  
  }
};