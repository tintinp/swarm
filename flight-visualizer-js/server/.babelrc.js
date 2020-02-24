module.exports = {
  ignore: [/(node_modules)/],
  plugins: ['@babel/plugin-proposal-class-properties'],
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        targets: {
          node: 'current'
        },
        useBuiltIns: 'usage'
      }
    ]
  ]
}
