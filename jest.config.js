module.exports = {
  transform: {
    '^.+\\.vue$': '@vue/vue2-jest',
    '^.+\\.js$': 'babel-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/**/*.test.{js,vue}',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html'],
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['js', 'vue', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  // testMatch: ['**/tests/**/*.spec.js'], // Configuração dos arquivos de teste
};

  
  
  
  