const withTM = require("next-transpile-modules")(["@repo/ui", "@repo/utils"]);

module.exports = withTM({
  reactStrictMode: true,
  output: "standalone",
  staticPageGenerationTimeout: 120,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/",
      },
    ];
  },
});
