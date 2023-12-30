const { basename, isAbsolute, join, resolve } = require("node:path");
const { mkdir, writeFile } = require("node:fs/promises");
const { bundle } = require("lightningcss");

/**
 *
 * @param {*} eleventyConfig
 * @param {{mapDir: string, lightningOptions: import("lightningcss").BundleOptions}} param1
 */
module.exports = (
  eleventyConfig,
  { mapDir = "assets/css", lightningOptions = {} } = {}
) => {
  eleventyConfig.addShortcode(
    "lightningcss",
    async function(cssFile) {
      let inputPath = resolve(this.page.inputPath, cssFile);
      if (isAbsolute(cssFile)) {
        inputPath = resolve(cssFile.slice(1));
      }
      eleventyConfig.addWatchTarget(inputPath);
      const { code, map } = bundle({
        filename: inputPath,
        sourceMap: true,
        ...lightningOptions,
      });
      const mapPath = join("/", mapDir, `${basename(cssFile)}.map`);
      if (mapDir) {
        await mkdir(join("_site", mapDir), { recursive: true });
        await writeFile(resolve("_site", mapDir, `${basename(cssFile)}.map`), map);
      }
      return `<style>${code}/*# sourceMappingURL=${mapPath.replaceAll("\\", "/")} */</style>`;
    }
  );
};
