const fs = require('fs');
const path = require('path');    
const inputPath = path.join(__dirname, 'input');

async function execute(){
    const [input] = fs.readFileSync(inputPath, 'utf8').split("\n")
    part1(input.split("-").map(v => Number(v)))
 
}

function part1([start, end]){
    let current = start;
    const potentialPasswords = [];

    while(current < end){
        // validate
        console.log(current)
        if(isSixDigits(current) && hasAdjacent(current) && doesNotDecrease(current)){
            potentialPasswords.push(current)
        }
        current += 1;
    }
}
function isSixDigits(n){
    return String(n).length === 6
}

function hasAdjacent(n){
    return true
}

function doesNotDecrease(n){
    return true
}
execute()