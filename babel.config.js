module.exports = {
  presets: [
    [
      "@babel/env",
      {
        targets: {
          browsers: ["last 2 versions"]
        }
      }
    ],
    "@babel/preset-typescript",
    "linaria/babel"
  ],
  plugins: [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread",
    "@babel/transform-computed-properties"
  ]
};
