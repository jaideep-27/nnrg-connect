const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function(env, argv) {
  // Get default config
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Add extensions to resolve .web.js files first
  config.resolve.extensions = [
    '.web.ts', '.web.tsx', '.web.js', '.web.jsx',
    '.ts', '.tsx', '.js', '.jsx'
  ];
  
  // Completely ignore MongoDB-related packages in the web build
  config.module.rules.push({
    test: /\.(js|jsx|ts|tsx)$/,
    include: [
      path.resolve(__dirname, 'node_modules/mongodb'),
      path.resolve(__dirname, 'node_modules/mongoose'),
      path.resolve(__dirname, 'node_modules/bson'),
    ],
    use: 'null-loader'
  });

  // Add fallbacks for Node.js core modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "fs": false,
    "path": false,
    "crypto": false,
    "stream": require.resolve("stream-browserify"),
    "buffer": require.resolve("buffer/"),
    "util": require.resolve("util/"),
    "process": require.resolve("process/browser"),
    "zlib": false,
    "http": false,
    "https": false,
    "net": false,
    "tls": false,
    "os": false,
    "dns": false,
    "child_process": false
  };

  return config;
}; 