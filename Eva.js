const assert = require("assert");

const Environment = require("./Environment");

class Eva {
  constructor(global = new Environment()) {
    this.global = global;
  }

  eval(exp, env = this.global) {
    // SELF EVALUATING EXPRESSIONS

    if (isNumber(exp)) {
      return exp;
    }

    if (isString(exp)) {
      return exp.slice(1, -1);
    }

    /**
     * Math operations implementations
     */

    if (exp[0] === "+") {
      return this.eval(exp[1], env) + this.eval(exp[2], env);
    }

    if (exp[0] === "*") {
      return this.eval(exp[1], env) * this.eval(exp[2], env);
    }

    if (exp[0] === "/") {
      return this.eval(exp[1], env) / this.eval(exp[2], env);
    }

    if (exp[0] === "-") {
      return this.eval(exp[1], env) - this.eval(exp[2], env);
    }

    /**
     * Comparison operators
     */

    if (exp[0] === ">") {
      return this.eval(exp[1], env) > this.eval(exp[2], env);
    }
    if (exp[0] === "<") {
      return this.eval(exp[1], env) < this.eval(exp[2], env);
    }
    if (exp[0] === ">=") {
      return this.eval(exp[1], env) >= this.eval(exp[2], env);
    }
    if (exp[0] === "<=") {
      return this.eval(exp[1], env) <= this.eval(exp[2], env);
    }
    if (exp[0] === "==") {
      return this.eval(exp[1], env) === this.eval(exp[2], env);
    }

    /**
     * Variable declarations
     * Assigning and setting
     */

    if (exp[0] === "var") {
      const [_, name, value] = exp;
      return env.define(name, this.eval(value, env));
    }

    if (exp[0] === "set") {
      const [_, name, value] = exp;
      return env.assign(name, this.eval(value, env));
    }

    if (exp[0] === "begin") {
      let blockEnv = new Environment({}, env);
      return this._evalBlock(exp, blockEnv);
    }

    if (exp[0] === "if") {
      const [_, cond, consequent, alternate] = exp;
      if (this.eval(cond, env)) {
        return this.eval(consequent, env);
      }
      return this.eval(alternate, env);
    }

    if (exp[0] === "while") {
      const [_, condition, body] = exp;
      let result;
      while (this.eval(condition, env)) {
        result = this.eval(body, env);
      }

      return result;
    }

    if (isVariableName(exp)) {
      return env.lookup(exp);
    }

    throw `Unimplemented ${JSON.stringify(exp)}`;
  }

  _evalBlock(block, newEnv) {
    let result;
    const [_tag, ...expressions] = block;

    expressions.forEach((exp) => {
      result = this.eval(exp, newEnv);
    });

    return result;
  }
}

function isNumber(exp) {
  return typeof exp === "number";
}

function isString(exp) {
  return typeof exp === "string" && exp[0] === '"' && exp.slice(-1) === '"';
}

function isVariableName(exp) {
  return typeof exp === "string" && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(exp);
}

// *********************************************************

module.exports = Eva;
