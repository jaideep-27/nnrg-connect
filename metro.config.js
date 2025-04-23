// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { resolve } = require('path');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Web specific platform resolver
const defaultResolver = config.resolver;
const defaultAssetExts = config.resolver.assetExts;
const defaultSourceExts = config.resolver.sourceExts;

// Create a specific resolver for web
config.resolver = {
  ...defaultResolver,
  assetExts: defaultAssetExts,
  sourceExts: [...defaultSourceExts, 'web.ts', 'web.tsx', 'web.js', 'web.jsx'],
  resolverMainFields: ['browser', 'main'],
  extraNodeModules: {
    // Provide empty modules for Node.js modules that won't work in the browser
    'fs': path.resolve(__dirname, 'shims/empty.js'),
    'mongodb': path.resolve(__dirname, 'shims/empty.js'),
    'mongoose': path.resolve(__dirname, 'shims/empty.js'),
    'bson': path.resolve(__dirname, 'shims/empty.js')
  }
};

module.exports = config; 