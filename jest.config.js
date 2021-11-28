module.exports = {
    verbose: true,
    rootDir: 'src',
    coverageDirectory: '../coverage/',
    testPathIgnorePatterns: ['/node_modules/', '.*fixture.js'],
    coveragePathIgnorePatterns: ['/node_modules/', '.*fixture.js'],
    testEnvironment: 'jsdom',
    "collectCoverageFrom": [
      "**/*.{js,jsx}",
      "!**/node_modules/**",
      "!**/vendor/**"
    ],
  };