const tests = [
  require("./block.spec"),
  require("./math.spec"),
  require("./self-eval.spec"),
  require("./variable.spec"),
  require("./if.spec"),
  require("./while.spec"),
  require("./built-in-functions.spec"),
];

const Eva = require("../Eva");

const eva = new Eva();

tests.forEach((test) => test(eva));

eva.eval(["print", '"hello"']);

console.log("All assertions passed");
