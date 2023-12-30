console.log("Run Mode: ", data.eleventy.env.runMode);
console.log("Branch: ", data.eleventy.env.BRANCH);

module.exports = (data) =>
  data.eleventy.env.runMode === "serve" || data.eleventy.env.BRANCH !== "main";
