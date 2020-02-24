const testPathIgnorePatterns = ['/node_modules/', '/dist/']

if (process.env.CI) {
  testPathIgnorePatterns.push('/tests/')
}

module.exports = {
  collectCoverageFrom: ['lib/**/*.js'],
  coverageDirectory: './coverage/',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/+(*.)+(spec|test).js?(x)'],
  testPathIgnorePatterns
}
