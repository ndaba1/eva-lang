const assert = require("assert");
const { test } = require("./test-util");

module.exports = (eva) => {
  assert.strictEqual(
    eva.eval([
      "begin",

      ["var", "x", 20],
      ["var", "y", 30],

      ["+", ["*", "x", "y"], 30],
    ]),
    630
  );

  assert.strictEqual(
    eva.eval([
      "begin",
      ["var", "x", 20],
      ["begin", ["var", "x", 10], "x"],
      "x",
    ]),
    20
  );

  assert.strictEqual(
    eva.eval([
      "begin",

      ["var", "value", 10],

      ["var", "result", ["begin", ["var", "x", ["+", "value", 10]], "x"]],
      "result",
    ]),
    20
  );

  assert.strictEqual(
    eva.eval([
      "begin",

      ["var", "data", 10],

      ["begin", ["set", "data", 100]],
      "data",
    ]),
    100
  );
  test(
    eva,
    `
      (begin 
        (var x 10)
        (var y 20)
        (+ (* x 10) y))
  `,
    120
  );
};
