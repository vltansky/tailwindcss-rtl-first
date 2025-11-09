import pluginFn from "../src/index";

describe("tailwindcss-rtl-first", () => {
  it("exports a valid Tailwind CSS v4 plugin", () => {
    // In v4, plugins are objects with handler and config properties
    expect(typeof pluginFn).toBe("object");
    expect(typeof pluginFn.handler).toBe("function");
  });
});
