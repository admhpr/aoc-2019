const fs = require("fs");
const path = require("path");
const inputPath = path.join(__dirname, "input-test");

const ADD = 1
const MULTIPLY = 2
const INPUT = 3
const OUTPUT = 4
const HALT = 99

const NUM_PARAMS = {
  ADD: 3,
  MULTIPLY: 3,
  INPUT: 1,
  OUTPUT: 1,
  JUMP_IF_TRUE: 2,
  JUMP_IF_FALSE: 2,
  LESS_THAN: 3,
  EQUALS: 3,
  HALT: 0,
}

const POSITION_MODE = 0
const IMMEDIATE_MODE = 1


function part1(array, input = 1) {
  
}

function placesFromPosition(pos, additional) {
  return String(Number(pos) + additional);
}

function getOperation(value) {
  const lookup = {
    1: function add(x, y) {
      return Math.abs(x) + Math.abs(y);
    },
    2: function multiply(x, y) {
      return Math.abs(x) * Math.abs(y);
    },
    3: function input(x, position, lookup) {
      lookup[position].value = x;
      return lookup;
    },
    4: function output(x) {
      console.log(`Output: ${x}`)
    },
    99: function end() {
      return false;
    }
  };
  return Object.keys(lookup).includes(String(value)) ? lookup[value] : null;
}

function getOpcode(n) {
  return n % 100;
}

function getModes(n) {
  return [remainderFrom(n, 10000), remainderFrom(n, 1000), remainderFrom(n, 100)];
}

function remainderFrom(n, divideBy) {
  console.log(n, Math.floor(n / divideBy))
  return Math.floor(n / divideBy) % 10;
}

function execute(compute = part1) {
  return compute(
    fs
      .readFileSync(inputPath, "utf8")
      .split(",")
      .map(v => Number(v))
  );
}
execute(part1);
