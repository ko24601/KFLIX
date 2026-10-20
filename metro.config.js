const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = false;

// Add 'html' to asset extensions
config.resolver.assetExts.push('html');

// Intercept modules safely and use 'sourceFile' (camelCase)
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.endsWith('.html')) {
    return context.resolveRequest(context, moduleName, platform);
  }

  if (moduleName === 'electron' || moduleName.startsWith('electron/')) {
    return {
      filePath: path.resolve(__dirname, 'electron-mock.js'),
      type: 'sourceFile',
    };
  }
  if (moduleName === 'path') {
    return {
      filePath: path.resolve(__dirname, 'path-mock.js'),
      type: 'sourceFile',
    };
  }
  if (moduleName === 'fs') {
    return {
      filePath: path.resolve(__dirname, 'fs-mock.js'),
      type: 'sourceFile',
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;