const fs = require("fs");
const path = require("path");
const readline = require("readline");
const inputPath = path.join(__dirname, "input");

function part1(total, moduleMass) {
  return (total += fuelNeeded(moduleMass));
}

function part2(total, moduleMass) {
  return fuelNeeded(moduleMass) > 0
    ? part2(part1(total, moduleMass), fuelNeeded(moduleMass))
    : total;
}

async function computeFuelNeeded(compute = part1) {
  const rl = readline.createInterface({
    input: fs.createReadStream(inputPath)
  });
  let total = 0;
  for await (const line of rl) {
    total = compute(total, line);
  }
  return total;
}

function fuelNeeded(mass) {
  return Math.floor(Math.abs(mass / 3)) - 2;
}

console.log(computeFuelNeeded(part1).then(t => console.log(t)));
console.log(computeFuelNeeded(part2).then(t => console.log(t)));
