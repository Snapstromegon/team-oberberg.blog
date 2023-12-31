module.exports = (data) => {
  console.log(
    "Run Mode: ",
    data.eleventy.env.runMode,
    data.eleventy.env.runMode === "serve"
  );
  console.log(
    "Branch: ",
    data.eleventy.env.BRANCH,
    data.eleventy.env.BRANCH !== "main"
  );

  return (
    data.eleventy.env.runMode === "serve" || data.eleventy.env.BRANCH !== "main"
  );
};
