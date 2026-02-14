export default {
    preset: 'ts-jest/presets/default-esm', // Use ESM preset
    testEnvironment: 'jsdom', // Default to jsdom for React components
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
        '^(\\.{1,2}/.*)\\.js$': '$1', // Handle .js extensions
    },
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            useESM: true,
        }],
        '^.+\\.js$': 'babel-jest',
    },
    transformIgnorePatterns: [
        'node_modules/(?!(uuid)/)'
    ],
    extensionsToTreatAsEsm: ['.ts', '.tsx', '.mts'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
