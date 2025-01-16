module.exports = {
  transform: {
    '^.+\\.vue$': '@vue/vue2-jest',
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['js', 'vue', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
};

  
  
  
  