"use strict";
var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
var fs = require("fs");
var path = require("path");
var inputPath = path.join(__dirname, "../input");
var operation = {
  "01": "ADD",
  "02": "MULTIPLY",
  "03": "INPUT",
  "04": "OUTPUT",
  "05": "JUMP_IF_TRUE",
  "06": "JUMP_IF_FALSE",
  "07": "LESS_THAN",
  "08": "EQUALS",
  "99": "HALT"
};
var NUM_PARAMS = {
  ADD: 3,
  MULTIPLY: 3,
  INPUT: 1,
  OUTPUT: 1,
  JUMP_IF_TRUE: 2,
  JUMP_IF_FALSE: 2,
  LESS_THAN: 3,
  EQUALS: 3,
  HALT: 0
};
var POSITION_MODE = 0;
var IMMEDIATE_MODE = 1;
var INPUT_VALUE = 5;
var Instruction = /** @class */ (function() {
  function Instruction(opcode, length, params, modes, memory) {
    this.opcode = opcode;
    this.length = length;
    this.params = params;
    this.modes = modes;
    this.memory = memory;
  }
  Instruction.prototype.getValue = function(paramIndex) {
    if (this.modes[paramIndex] === IMMEDIATE_MODE) {
      return this.params[paramIndex];
    }
    return this.memory[this.params[paramIndex]];
  };
  Instruction.prototype.setValue = function(paramAddressIndex, value) {
    this.memory[this.params[paramAddressIndex]] = value;
  };
  return Instruction;
})();
var Add = /** @class */ (function(_super) {
  __extends(Add, _super);
  function Add() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Add.prototype.call = function() {
    var x = this.getValue(0);
    var y = this.getValue(1);
    this.setValue(2, x + y);
  };
  return Add;
})(Instruction);
var Multiply = /** @class */ (function(_super) {
  __extends(Multiply, _super);
  function Multiply() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Multiply.prototype.call = function() {
    var x = this.getValue(0);
    var y = this.getValue(1);
    this.setValue(2, x * y);
  };
  return Multiply;
})(Instruction);
var Input = /** @class */ (function(_super) {
  __extends(Input, _super);
  function Input() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Input.prototype.call = function() {
    this.setValue(0, INPUT_VALUE);
  };
  return Input;
})(Instruction);
var JumpIfTrue = /** @class */ (function(_super) {
  __extends(JumpIfTrue, _super);
  function JumpIfTrue() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  JumpIfTrue.prototype.call = function() {
    var inValue = this.getValue(0);
    var outValue = this.getValue(1);
    if (inValue) {
      return outValue;
    }
  };
  return JumpIfTrue;
})(Instruction);
var JumpIfFalse = /** @class */ (function(_super) {
  __extends(JumpIfFalse, _super);
  function JumpIfFalse() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  JumpIfFalse.prototype.call = function() {
    var inValue = this.getValue(0);
    var outValue = this.getValue(1);
    if (!inValue) {
      return outValue;
    }
  };
  return JumpIfFalse;
})(Instruction);
var LessThan = /** @class */ (function(_super) {
  __extends(LessThan, _super);
  function LessThan() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  LessThan.prototype.call = function() {
    var x = this.getValue(0);
    var y = this.getValue(1);
    var outValue = Number(x < y);
    this.setValue(2, outValue);
  };
  return LessThan;
})(Instruction);
var Equals = /** @class */ (function(_super) {
  __extends(Equals, _super);
  function Equals() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Equals.prototype.call = function() {
    var x = this.getValue(0);
    var y = this.getValue(1);
    var outValue = Number(x === y);
    this.setValue(2, outValue);
  };
  return Equals;
})(Instruction);
var Output = /** @class */ (function(_super) {
  __extends(Output, _super);
  function Output() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Output.prototype.call = function() {
    console.log("Output: " + this.getValue(0));
  };
  return Output;
})(Instruction);
var Halt = /** @class */ (function(_super) {
  __extends(Halt, _super);
  function Halt() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Halt.prototype.call = function() {
    return;
  };
  return Halt;
})(Instruction);
var HANDLERS = {
  ADD: Add,
  MULTIPLY: Multiply,
  INPUT: Input,
  OUTPUT: Output,
  JUMP_IF_TRUE: JumpIfTrue,
  JUMP_IF_FALSE: JumpIfFalse,
  LESS_THAN: LessThan,
  EQUALS: Equals,
  HALT: Halt
};
function createInstruction(memory, pointer) {
  var encoded = memory[pointer];
  var opcode = String(encoded).slice(-2);
  if (opcode.length === 1) {
    opcode = "0" + opcode;
  }
  var handler = operation[opcode];
  console.log(opcode, handler);
  var numberParams = NUM_PARAMS[handler];
  var params = memory.slice(pointer + 1, pointer + numberParams + 1);
  var modes = getModes(encoded, numberParams);
  console.log(modes);
  return new HANDLERS[handler](opcode, numberParams + 1, params, modes, memory);
}
function getModes(n, numberParams) {
  var digits = ("" + n).split("");
  console.log(numberParams);
  if (digits.length === 1 || [0, 1].includes(numberParams)) {
    return [0, 0, 0];
  }
  var lastTwo = digits.splice(digits.length - 2);
  return __spreadArrays(
    Array(numberParams - lastTwo.length).fill(0),
    digits.map(function(v) {
      return Number(v);
    })
  ).reverse();
}
function execute() {
  var data = fs
    .readFileSync(inputPath, "utf8")
    .split(",")
    .map(function(v) {
      return Number(v);
    });
  var pointer = 0;
  while (true) {
    var instruction = createInstruction(data, pointer);
    var HALT = "99";
    if (instruction.opcode === HALT) {
      return;
    }
    var jump = instruction.call();
    if (jump) {
      pointer = jump;
    } else {
      pointer += instruction.length;
    }
  }
}
execute();
