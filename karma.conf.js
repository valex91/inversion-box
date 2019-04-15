process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
  config.set({
    frameworks: ["jasmine", "karma-typescript"],
    files: [
      "lib/**/*.ts"
    ],
    include: [
      'lib/**/*.spec.ts'
    ],
    preprocessors: {
      "**/*.ts": "karma-typescript"
    },
    reporters: ["progress", "karma-typescript"],
    browsers: ['ChromeHeadless'],
    exclude: ['node_modules',
      '**/*.d.ts'],
    karmaTypescriptConfig: {
      exclude: ['node_modules']
    }
  });
};