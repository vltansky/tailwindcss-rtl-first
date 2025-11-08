module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/test-e2e/"],
  transform: {
    "^.+\\.js$": [
      "@swc/jest",
      {
        swcrc: false,
        jsc: {
          parser: {
            syntax: "ecmascript",
            dynamicImport: true,
          },
        },
        module: {
          type: "commonjs",
        },
      },
    ],
  },
  transformIgnorePatterns: ["node_modules/(?!(@tailwindcss)/)"],
};
