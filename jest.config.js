module.exports = {
  transform: {
    "^.+\\.[t]sx?$": "babel-jest"
  },
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
  roots: ["<rootDir>/src/"],
  testEnvironment: "node",
  testPathIgnorePatterns: ["/dist/", "/examples/", "/node_modules/"]
};
