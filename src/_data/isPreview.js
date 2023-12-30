module.exports = (data) =>
  data.eleventy.env.runMode === "serve" || data.eleventy.env.BRANCH !== "main";
