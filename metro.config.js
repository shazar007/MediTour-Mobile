const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

module.exports = mergeConfig(
  getDefaultConfig(__dirname, {
    resolver: {
      sourceExts: ['jsx', 'js', 'ts', 'tsx','svg'], // Add any other source extensions you're using
    },
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    enableHermes: false, // Disable Hermes engine
  }),
);
