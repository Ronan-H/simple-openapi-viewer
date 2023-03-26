// I needed to write a custom webpack config, even though I used create-react-app.
// Thankfully, there is an npm package to get around that:
// https://www.npmjs.com/package/react-app-rewired
const { merge } = require('webpack-merge');

module.exports = function override(config, env) {
  const customConfig = {
    resolve: {
      fallback: {
        'crypto': require.resolve('crypto-browserify'),
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer/"),
      }
    }
  };

  return merge(config, customConfig);
}
