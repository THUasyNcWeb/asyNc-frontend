module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testResultsProcessor: "jest-sonar-reporter",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,ts,vue}"],
}

