const BABEL_ENV = process.env.BABEL_ENV;
const building = BABEL_ENV != undefined && BABEL_ENV !== "cjs";

const plugins = [
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-proposal-object-rest-spread",
];

module.exports = function () {
  return {
    presets: [
      [
        "@babel/preset-env",
        { loose: true, modules: building ? false : "commonjs" },
      ],
      "@babel/preset-react",
    ],
    plugins: plugins,
  };
};
