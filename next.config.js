const { parsed: localEnv } = require('dotenv').config();

const webpack = require('webpack');
const withTM = require('next-transpile-modules')(['wiloke-react-core']);
const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);

module.exports = withTM({
  webpack: config => {
    const env = { API_KEY: apiKey };
    config.plugins.push(new webpack.DefinePlugin(env));

    // Add ESM support for .mjs files in webpack 4
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

    return config;
  },
});
