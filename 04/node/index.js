const fs = require("fs");
const path = require("path");
const inputPath = path.join(__dirname, "input");

async function execute() {
  const [input] = fs.readFileSync(inputPath, "utf8").split("\n");
  const range = input.split("-").map(v => Number(v));
  console.log(part1(range).length);
  console.log(part2(range).length);
}

function part1([start, end]) {
  let current = start;
  const potentialPasswords = [];
  while (current < end) {
    if (
      isSixDigits(current) &&
      doesNotDecrease(current) &&
      hasAdjacent(current)
    ) {
      potentialPasswords.push(current);
    }
    current += 1;
  }
  return potentialPasswords;
}

function part2(range) {
  const potentialPasswords = part1(range);
  return potentialPasswords.filter(password => hasTwoAdjacent(password));
}

function hasTwoAdjacent(password) {
  const digitCount = new Map();
  `${password}`.split("").forEach(digit => {
    if (!digitCount.has(digit)) {
      digitCount.set(digit, 1);
      return;
    }
    const count = digitCount.get(digit);
    const next = count + 1;
    digitCount.set(digit, next);
  });
  return [...digitCount.values()].includes(2);
}
function isSixDigits(n) {
  return String(n).length === 6;
}

function hasAdjacent(n) {
  return new Set(`${n}`.split("").map(v => Number(v))).size !== 6;
}

function doesNotDecrease(n) {
  const digits = `${n}`.split("").map(v => Number(v));
  return digits.every(
    (digit, index) => index === 0 || digits[index - 1] <= digit
  );
}
execute();
