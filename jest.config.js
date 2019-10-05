module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  roots: ["<rootDir>/src/"],
  testEnvironment: "node",
  testPathIgnorePatterns: ["/dist/", "/examples/", "/node_modules/"]
};
