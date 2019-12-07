"use strict";
var fs = require("fs");
var path = require("path");
var inputPath = path.join(__dirname, "../input-test");
var ADD = 1;
var MULTIPLY = 2;
var INPUT = 3;
var OUTPUT = 4;
var HALT = 99;
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
var Instruction = /** @class */ (function () {
    function Instruction(opcode, length, params, modes, memory) {
        this.opcode = opcode;
        this.length = length;
        this.params = params;
        this.modes = modes;
        this.memory = memory;
    }
    Instruction.prototype.getValue = function (paramIndex) {
        if (this.modes[paramIndex] === IMMEDIATE_MODE) {
            return this.params[paramIndex];
        }
        return this.memory[this.params[paramIndex]];
    };
    Instruction.prototype.setValue = function (paramAddressIndex, value) {
        this.memory[this.params[paramAddressIndex]] = value;
    };
    return Instruction;
}());
function part1() { }
function execute() {
    var input = fs
        .readFileSync(inputPath, "utf8")
        .split(",")
        .map(function (v) { return Number(v); });
}
execute();
