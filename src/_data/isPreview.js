console.log("Run Mode: ", process.env.runMode);
console.log("Branch: ", process.env.BRANCH);

module.exports = (data) =>
  data.eleventy.env.runMode === "serve" || data.eleventy.env.BRANCH !== "main";
