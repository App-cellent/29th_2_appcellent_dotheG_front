module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv', {
        moduleName: '@env',
        path: '.env',
    }],
    ['@babel/plugin-transform-private-methods', { loose: true }], // loose: true 추가
    ['@babel/plugin-transform-class-properties', { loose: true }], // loose: true 추가
    ['@babel/plugin-transform-private-property-in-object', { loose: true }], // loose: true 추가
  ],
};