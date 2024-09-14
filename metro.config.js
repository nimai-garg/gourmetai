// metro.config.js
const path = require('path');

module.exports = {
  transformer: {
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
  },
  resolver: {
    assetExts: ['ttf', 'otf', 'png', 'jpg', 'jpeg', 'gif', 'svg'],
    sourceExts: ['js', 'jsx', 'ts', 'tsx', 'cjs'],
  },
};