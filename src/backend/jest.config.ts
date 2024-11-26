const config = {
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  detectOpenHandles: true,
  forceExit: true,
  maxConcurrency: 1,
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  testTimeout: 30000,
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        isolatedModules: true,
      },
    ],
  },
  verbose: true,
};

export default config;
