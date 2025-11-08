import plugin from "tailwindcss/plugin";
import { corePlugins } from "./corePlugins";

/**
 * A single plugin to rule them all.
 * Loading the overriden core plugins.
 */
const tailwindRtlFirst = plugin((helpers) => {
  corePlugins.inset(helpers);
  corePlugins.margin(helpers);
  corePlugins.scrollMargin(helpers);
  corePlugins.scrollPadding(helpers);
  corePlugins.borderRadius(helpers);
  corePlugins.borderWidth(helpers);
  corePlugins.borderColor(helpers);
  corePlugins.borderOpacity(helpers);
  corePlugins.padding(helpers);
  corePlugins.textAlign(helpers);
});

module.exports = tailwindRtlFirst;
