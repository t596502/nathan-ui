const path = require('path');
module.exports = {
  // stories: [require.context('../src/components', true, /\.stories\.tsx$/)],
  stories: ['../src/components/**/*.stories.tsx'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules = config.module.rules.filter(rule => {
      if(rule.test) {
        return !rule.test.test(".scss")
      }
    });
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader',{
        loader:'sass-loader',
      }],
      include: path.resolve(__dirname, '../'),
    });

    // Return the altered config
    return config;
  },
};
