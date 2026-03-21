module.exports = {
    transform: {
        "^.+\\.ts$": ["babel-jest", { configFile: "./babel.config.cjs" }]
    },
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "js"],
    roots: ["<rootDir>/tests"]
};