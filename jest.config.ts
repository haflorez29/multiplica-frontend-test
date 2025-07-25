import nextJest from 'next/jest'

const createJestConfig = nextJest({ dir: './' })

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^test-utils$': '<rootDir>/utils/test-utils',
    '^.+\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
}

export default createJestConfig(customJestConfig)
