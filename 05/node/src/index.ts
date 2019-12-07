const fs = require("fs");
const path = require("path");
const inputPath = path.join(__dirname, "../input-test");

const ADD = 1;
const MULTIPLY = 2;
const INPUT = 3;
const OUTPUT = 4;
const HALT = 99;

const NUM_PARAMS = {
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

const POSITION_MODE = 0;
const IMMEDIATE_MODE = 1;

class Instruction {
  constructor(
    private opcode: number,
    private length: number,
    private params: number[],
    private modes: number[],
    private memory: number[]
  ) {}
  getValue(paramIndex: number) {
    if (this.modes[paramIndex] === IMMEDIATE_MODE) {
      return this.params[paramIndex];
    }
    return this.memory[this.params[paramIndex]];
  }
  setValue(paramAddressIndex: number, value: number) {
    this.memory[this.params[paramAddressIndex]] = value;
  }
}
function part1() {}

function execute() {
  const input = fs
  .readFileSync(inputPath, "utf8")
  .split(",")
  .map((v: string) => Number(v))
}
execute();
