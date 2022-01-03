const assert = require("assert");

module.exports = (eva) => {
  assert.strictEqual(eva.eval(["+", 5, 6]), 11);
  assert.strictEqual(eva.eval(["+", ["+", 3, 2], 5]), 10);
  assert.strictEqual(eva.eval(["+", ["*", 3, 2], 5]), 11);
  assert.strictEqual(eva.eval(["/", ["*", 5, 5], 5]), 5);
  assert.strictEqual(eva.eval(["-", ["*", 5, 5], 5]), 20);
};
