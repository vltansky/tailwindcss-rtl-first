import pluginFn from "../src/index";

describe("tailwindcss-rtl-first", () => {
  it("disables a stable set of core plugins", () => {
    expect(pluginFn.disabledCorePlugins).toMatchInlineSnapshot(`
      {
        "borderColor": false,
        "borderOpacity": false,
        "borderRadius": false,
        "borderWidth": false,
        "inset": false,
        "margin": false,
        "padding": false,
        "scrollMargin": false,
        "scrollPadding": false,
        "textAlign": false,
      }
    `);
  });
});
