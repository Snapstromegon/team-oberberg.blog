module.exports = (data) => 
    data.eleventy.env.runMode === "serve" || process.env.BRANCH !== "main"
