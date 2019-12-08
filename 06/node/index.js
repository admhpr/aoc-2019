
const fs = require("fs");
const path = require("path");
const inputPath = path.join(__dirname, "input-test");

function execute(){
    const input = fs.readFileSync(inputPath, "utf8").split("\n");
    console.log(input)
}

execute()