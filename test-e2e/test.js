#!/usr/bin/env node

const postcss = require("postcss");
const fs = require("fs");
const path = require("path");

async function test() {
  console.log("🧪 Testing Tailwind CSS v4 RTL Plugin...\n");

  const css = fs.readFileSync(path.join(__dirname, "input.css"), "utf-8");

  try {
    const tailwindcss = require("@tailwindcss/postcss");
    const result = await postcss([tailwindcss]).process(css, {
      from: path.join(__dirname, "input.css"),
    });

    const output = result.css;

    // Test cases
    const tests = [
      {
        name: "ml-4 generates RTL/LTR variants",
        check: () =>
          output.includes('body[dir="rtl"]') &&
          output.includes('body[dir="ltr"]') &&
          output.includes(".ml-4"),
      },
      {
        name: "mr-8 generates RTL/LTR variants",
        check: () =>
          output.includes(".mr-8") &&
          output.includes("margin-right") &&
          output.includes("margin-left"),
      },
      {
        name: "text-left swaps to text-align: end",
        check: () =>
          output.includes(".text-left") &&
          output.includes("text-align") &&
          output.includes("end"),
      },
      {
        name: "text-right swaps to text-align: start",
        check: () =>
          output.includes(".text-right") &&
          output.includes("text-align") &&
          output.includes("start"),
      },
      {
        name: "rounded-l generates RTL/LTR variants",
        check: () =>
          output.includes(".rounded-l") &&
          output.includes("border-top-left-radius") &&
          output.includes("border-top-right-radius"),
      },
      {
        name: "border-l-blue-500 generates RTL/LTR color variants",
        check: () =>
          output.includes(".border-l-blue-500") &&
          output.includes("border-left-color") &&
          output.includes("border-right-color"),
      },
      {
        name: "border-r-red-500 generates RTL/LTR color variants",
        check: () =>
          output.includes(".border-r-red-500") &&
          output.includes("border-right-color") &&
          output.includes("border-left-color"),
      },
      {
        name: "ml-0 generates RTL/LTR variants with zero value",
        check: () =>
          output.includes(".ml-0") &&
          (output.includes("margin-left: 0") ||
            output.includes("margin-left:0")),
      },
    ];

    let passed = 0;
    let failed = 0;

    tests.forEach((test) => {
      if (test.check()) {
        console.log(`✅ ${test.name}`);
        passed++;
      } else {
        console.log(`❌ ${test.name}`);
        failed++;
      }
    });

    console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

    if (failed > 0) {
      console.log("Generated CSS preview:");
      console.log("─".repeat(60));
      console.log(output.slice(0, 1000) + "...\n");
      process.exit(1);
    }

    // Write output for manual inspection
    fs.writeFileSync(path.join(__dirname, "output.css"), output);
    console.log("✨ Full output written to test-e2e/output.css\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Test failed with error:");
    console.error(error);
    process.exit(1);
  }
}

test();
