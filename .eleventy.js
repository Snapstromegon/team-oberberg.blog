const Image = require("@11ty/eleventy-img");
const browserslist = require("browserslist");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const rollupPlugin = require("eleventy-plugin-rollup");
const lightningCssPlugin = require("./lib/lightning-css");
const yaml = require("js-yaml");
const markdownitEmoji = require("markdown-it-emoji");
const typescript = require("@rollup/plugin-typescript");
const commonjs = require("@rollup/plugin-commonjs");
const resolve = require("@rollup/plugin-node-resolve");
const loadJson = require("@rollup/plugin-json");
const { browserslistToTargets } = require("lightningcss");
const { EleventyRenderPlugin } = require("@11ty/eleventy");

function generateImages(src) {
  return Image(src, {
    formats: [
      "avif",
      "webp",
      src.toLowerCase().endsWith(".png") ? "png" : "jpeg",
    ],
    outputDir: "_site/img/",
    widths: [256, 512, 1024, null],
  });
}

async function imageShortcode(
  src,
  alt,
  sizes = "(min-width: 50rem) 50rem, 100vw",
  lazy = true
) {
  if (src.startsWith("/")) {
    src = `.${src}`;
  }
  const metadata = await generateImages(src);

  const imageAttributes = {
    alt,
    decoding: "async",
    loading: lazy ? "lazy" : "eager",
    sizes,
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(rollupPlugin, {
    rollupOptions: {
      output: {
        dir: "_site/js",
        format: "es",
        sourcemap: process.env.NETLIFY !== "true",
      },
      plugins: [typescript(), commonjs(), resolve(), loadJson()],
    },
  });
  const targets = browserslistToTargets(
    browserslist("last 2 versions, not dead, > 0.2%")
  );
  eleventyConfig.addPlugin(lightningCssPlugin, {
    lightningOptions: {
      drafts: {
        nesting: true,
      },
      minify: true,
      targets,
    },
  });
  eleventyConfig.addFilter("niceDate", (date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Dec",
    ];
    return `${date.getDate()}. ${
      months[date.getMonth()]
    } ${date.getFullYear()}`;
  });
  eleventyConfig.addFilter("age", (date) => {
    const now = new Date();
    const age = now.getFullYear() - new Date(date).getFullYear();
    return age;
  });
  eleventyConfig.addFilter("sortByStartNo", (starters) =>
    [...starters].sort((a, b) => a.data.startNo - b.data.startNo)
  );

  eleventyConfig.addAsyncShortcode("image", imageShortcode);
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));
  eleventyConfig.addDataExtension("yml", (contents) => yaml.load(contents));
  eleventyConfig.amendLibrary("md", (mdLib) =>
    mdLib
      .set({
        breaks: true,
        html: true,
        linkify: true,
      })
      .use(markdownitEmoji.full)
  );
  eleventyConfig.addWatchTarget("./assets/");
  eleventyConfig.addPassthroughCopy("src/admin/config.yml");
  eleventyConfig.addPassthroughCopy("assets/fonts/*");
  // Return your Object options:
  return {
    dir: { input: "src" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: false,
  };
};
