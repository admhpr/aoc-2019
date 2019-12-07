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
      isOpcode: [1, 2, 3, 4, 99].includes(getOpcode(value)) && position > (currentOpcode + currentParamLength),
      operation: getOperation(getOpcode(value)),
      modes: getModes(value),
    };
    if(lookup[position].isOpcode){
      currentParamLength = String(lookup[position].value).split("").length 
      lookup[position].operationRange = currentParamLength
      currentOpcode = position;
    }
  });
  console.log(lookup)
  for (const [pos, value] of Object.entries(lookup)) {
    if (value.isOpcode) {
      // console.log(pos, value)
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
    3: function input(x) {
      return x;
    },
    4: function output(x) {
      return x;
    },
    99: function end() {
      return false;
    }
  };
  return Object.keys(lookup).includes(String(value)) ? lookup[value] : null;
}

function getOpcode(n){
  return n % 100
}

function getModes(n){
  let modes = [];
  const thousands = Math.floor(n/1000) % 10;
  modes[0] = thousands;
  const hundreds = Math.floor(n/100) % 10;
  modes[1] = hundreds;
  const tens = Math.floor(n/10) % 10;
  modes[2] = tens;
  return modes

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
