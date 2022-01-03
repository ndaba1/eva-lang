const tests = [
  require("./block.spec"),
  require("./math.spec"),
  require("./self-eval.spec"),
  require("./variable.spec"),
  require("./if.spec"),
  require("./while.spec"),
];

const Eva = require("../Eva");

const eva = new Eva();

tests.forEach((test) => test(eva));

console.log("All assertions passed");
