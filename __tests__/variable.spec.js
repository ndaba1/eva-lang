const assert = require("assert");

module.exports = (eva) => {
  assert.strictEqual(eva.eval(["var", "x", 5]), 5);
  assert.strictEqual(eva.eval("x"), 5);
  assert.strictEqual(eva.eval(["var", "y", ["*", 4, 5]]), 20);
};
