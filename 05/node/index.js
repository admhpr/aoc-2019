const fs = require("fs");
const path = require("path");
const inputPath = path.join(__dirname, "input-test");

function part1(array) {
  const lookup = {};
  let currentParamLength = String(array[0]).split("").length;
  let currentOpcode = 0;
  array.forEach((value, position) => {
    lookup[position] = {
      value,
      opcode: getOpcode(value),
      isOpcode:
        [1, 2, 3, 4, 99].includes(getOpcode(value)) &&
        position > currentOpcode + currentParamLength || position === 0,
      operation: getOperation(getOpcode(value)),
      modes: getModes(value)
    };
    if (lookup[position].isOpcode) {
      currentParamLength = String(lookup[position].value).split("").length;
      lookup[position].operationRange = currentParamLength;
      currentOpcode = position;
    }
  });
  for (const [pos, value] of Object.entries(lookup)) {
    if (value.isOpcode) {
      //todo
    }
  }
  return Object.values(lookup).map(({ value }) => value)[0];
}

function placesFromPosition(pos, additional) {
  return String(Number(pos) + additional);
}

function getOperation(value) {
  const lookup = {
    1: function add(x, y) {
      return x.value + y.value;
    },
    2: function multiply(x, y) {
      return x.value * y.value;
    },
    3: function input(x, position, lookup) {
      lookup[position].value = x;
      return lookup;
    },
    4: function output(x) {
      console.log(x)
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
  return [remainderFrom(n, 1000), remainderFrom(n, 100), remainderFrom(n, 10)];
}

function remainderFrom(n, divideBy) {
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

console.log(execute(part1));
