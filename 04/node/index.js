const fs = require('fs');
const path = require('path');    
const inputPath = path.join(__dirname, 'input');

async function execute(){
    const [input] = fs.readFileSync(inputPath, 'utf8').split("\n")
    part1(input.split("-").map(v => Number(v)))
 
}

function part1([start, end]){
    let current = start;
    while(current < end){
        // validate
        console.log(current)
        current += 1;
    }
}
execute()