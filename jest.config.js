module.exports = {
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  setTimeout: 20000,
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src",
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
};
