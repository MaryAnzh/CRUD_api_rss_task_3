module.exports = {
    preset: "ts-jest/presets/default-esm",
    testEnvironment: "node",
    extensionsToTreatAsEsm: [".ts"],
    transform: {
        "^.+\\.ts$": [
            "ts-jest",
            {
                useESM: true,
                tsconfig: "tsconfig.json"
            }
        ]
    },
    moduleNameMapper: {
        "^~constants$": "<rootDir>/src/constants/index.ts",
        "^~constants/(.*)$": "<rootDir>/src/constants/$1",

        "^~types$": "<rootDir>/src/types/index.ts",
        "^~types/(.*)$": "<rootDir>/src/types/$1",

        "^~db$": "<rootDir>/src/db/index.ts",
        "^~db/(.*)$": "<rootDir>/src/db/$1",

        "^~routes$": "<rootDir>/src/routes/index.ts",
        "^~routes/(.*)$": "<rootDir>/src/routes/$1",

        "^~controllers$": "<rootDir>/src/controllers/index.ts",
        "^~controllers/(.*)$": "<rootDir>/src/controllers/$1",

        "^~utils/(.*)$": "<rootDir>/src/utils/$1"
    }
};