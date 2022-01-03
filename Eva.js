const assert = require("assert");

const Environment = require("./Environment");

class Eva {
  constructor(global = GlobalEnvironment) {
    this.global = global;
  }

  eval(exp, env = this.global) {
    // SELF EVALUATING EXPRESSIONS

    if (this._isNumber(exp)) {
      return exp;
    }

    if (this._isString(exp)) {
      return exp.slice(1, -1);
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

    if (this._isVariableName(exp)) {
      return env.lookup(exp);
    }

    if (Array.isArray(exp)) {
      const fn = this.eval(exp[0], env);

      const args = exp.slice(1).map((arg) => this.eval(arg, env));

      if (typeof fn === "function") {
        return fn(...args);
      } else {
        console.log(fn);
      }
    }
    console.log(exp);
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

  _isNumber(exp) {
    return typeof exp === "number";
  }

  _isString(exp) {
    return typeof exp === "string" && exp[0] === '"' && exp.slice(-1) === '"';
  }

  _isVariableName(exp) {
    return (
      typeof exp === "string" && /^[+\-*/<>=a-zA-Z][a-zA-Z0-9_]*$/.test(exp)
    );
  }
}

// *********************************************************

const GlobalEnvironment = new Environment({
  null: null,
  true: true,
  false: false,

  VERSION: 0.1,

  "+"(op1, op2) {
    return op1 + op2;
  },

  "*"(op1, op2) {
    return op1 * op2;
  },

  "-"(op1, op2 = null) {
    if (op2 == null) {
      return -op1;
    }
    return op1 - op2;
  },

  "/"(op1, op2) {
    return op1 / op2;
  },

  ">"(op1, op2) {
    return op1 > op2;
  },

  "<"(op1, op2) {
    return op1 < op2;
  },

  ">="(op1, op2) {
    return op1 >= op2;
  },

  "<="(op1, op2) {
    return op1 <= op2;
  },

  "="(op1, op2) {
    return op1 === op2;
  },

  print(...args) {
    console.log(...args);
  },
});

module.exports = Eva;
