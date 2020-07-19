const path = require("path"); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = {
  chainWebpack: config => {
    config
      .entry("app")
      .clear()
      .add("./src/app/main.ts")
      .end();
    config.resolve.alias.set("@", path.join(__dirname, "./src/app"));

    config.plugin("html").tap(args => {
      args[0].template = path.join(__dirname, "./src/app/public/index.html");
      return args;
    });

    const tsx = config.module.rule("tsx");
    const ts = config.module.rule("ts");
    tsx
      .use("ts-loader")
      .loader("ts-loader")
      .tap(options => {
        options["configFile"] = "tsconfig.frontend.json";
        return options;
      })
      .end();
    ts.use("ts-loader")
      .loader("ts-loader")
      .tap(options => {
        options["configFile"] = "tsconfig.frontend.json";
        return options;
      })
      .end();
  },

  devServer: {
    proxy: "http://localhost:3000"
  },

  productionSourceMap: false
};
