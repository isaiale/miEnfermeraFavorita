module.exports = {
  testEnvironment: 'jsdom', // Esta línea es suficiente para la mayoría de los casos.
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', 'testCafe/'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/src/__mocks__/fileMock.jsx',
  },
};