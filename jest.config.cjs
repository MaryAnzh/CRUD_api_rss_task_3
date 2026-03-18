module.exports = {
    preset: "ts-jest/presets/default-esm",
    testEnvironment: "node",
    extensionsToTreatAsEsm: [".ts"],
    globals: {
        "ts-jest": {
            useESM: true
        }
    },
    moduleNameMapper: {
        "^~constants$": "<rootDir>/src/constants.ts",
        "^~db/(.*)$": "<rootDir>/src/db/$1",
        "^~routes/(.*)$": "<rootDir>/src/routes/$1",
        "^~controllers/(.*)$": "<rootDir>/src/controllers/$1",
        "^~utils/(.*)$": "<rootDir>/src/utils/$1",
        "^~types/(.*)$": "<rootDir>/src/types/$1",
        "^~types$": "<rootDir>/src/types/index.ts"
    }
};