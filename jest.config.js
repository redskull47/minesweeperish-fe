module.exports = {
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts"
  ],
  "coverageReporters": [
    "html",
    "text-summary"
  ],
  "resolver": "jest-pnp-resolver",
  "setupFiles": [
    "react-app-polyfill/jsdom"
  ],
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}"
  ],
  "testEnvironment": "jsdom",
  "testURL": "http://localhost",
  "transform": {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  "moduleNameMapper": {
    "^services/(.*)": "<rootDir>/src/services/$1",
    "^config/(.*)": "<rootDir>/src/config/$1",
    "^components/(.*)": "<rootDir>/src/components/$1",
    "^views/(.*)": "<rootDir>/src/views/$1",
    "^request(.*)": "<rootDir>/src/services/api/apiRequest$1",
    "^makeAction(.*)": "<rootDir>/src/services/common/redux/actions/makeAction$1",
    "^react-native$": "react-native-web",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
  },
  "moduleFileExtensions": [
    "tsx",
    "ts",
    "web.js",
    "js",
    "web.ts",
    "web.tsx",
    "json",
    "web.jsx",
    "jsx",
    "node"
  ],
  "watchPlugins": [
    "<rootDir>/node_modules/jest-watch-typeahead/filename.js",
    "<rootDir>/node_modules/jest-watch-typeahead/testname.js"
  ]
}