module.exports = {
    transform: {
      "^.+\\.[t|j]sx?$": "babel-jest",  // Apply Babel transformation to JS and JSX files
    },
    transformIgnorePatterns: [
      "/node_modules/(?!react-codogen)/"  // Apply Babel transformation to `react-codogen`
    ],
    // Ensure Jest recognizes ES module files in node_modules
    extensionsToTreatAsEsm: ['.js', '.jsx'],
  };
  