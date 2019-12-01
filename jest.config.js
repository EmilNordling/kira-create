module.exports = {
  "testRegex": "test/*.*\\.(t|j)s?$",
  "transform": {
    "^.+\\.tsx?$": "ts-jest",
  },
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json"
  ],
  "testPathIgnorePatterns": [
    "/node_modules/",
    "/\\./"
  ],
  "watchPathIgnorePatterns": [
    "<rootDir>/node_modules/"
  ]
}
