const fs = require('fs');
const path = require('path');    
const inputPath = path.join(__dirname, 'input');

async function execute(){
    const input = fs.readFileSync(inputPath, 'utf8').split("\n")
    const wires = {"0": [], "1": []}
    input.forEach((line, index) => {
        wires[index] = line.split(",")
    })
    const wirePathA = computePath(wires["0"])
    const wirePathB = computePath(wires["1"])
    const crossOverPoints = getCrossOverPoints(wirePathA, wirePathB)
    console.log(findMinDistance(crossOverPoints, wirePathA, wirePathB));
}
function computePath(path){
    const points = new Map();
    let x = 0;
    let y = 0;
    let steps = 1;    
    path.forEach(movement => {
        let direction = movement.substring(0,1);
        let spaces = parseInt(movement.substring(1, movement.length));   
        for ( let i = 0; i < spaces; i++ ) {
            switch (direction) {
                case 'U': y--; break;
                case 'D': y++; break;
                case 'L': x--; break;
                case 'R': x++; break;
            }   
            if ( !points.has(`${x},${y}`) ) {
                points.set(`${x},${y}`, steps);
            }
            steps++
        }
    })
    return points
}

function getCrossOverPoints(wirePathA, wirePathB) {
    const crossOverPoints = [];
    wirePathA.forEach( (_, key) => {
        if ( wirePathB.has(key) ) { 
            crossOverPoints.push(key) 
        }
    })
    return crossOverPoints;
}

function findMinDistance(crossOverPoints, wirePathA, wirePathB) {
    let minDistanceKey = crossOverPoints[0];
    let minTravelDistance = wirePathA.get(minDistanceKey) + wirePathB.get(minDistanceKey);
    crossOverPoints.forEach(intersection => {
        const totalDistance = wirePathA.get(intersection) + wirePathB.get(intersection);
        if ( totalDistance < minTravelDistance ) {
            minTravelDistance = totalDistance;
        }
    });
    return minTravelDistance;
}

function findDistanceToStart([x, y]) {
    // @see: https://stackoverflow.com/questions/8224470/calculating-manhattan-distance
    return Math.abs(Number(x)) + Math.abs(Number(y));
}
execute()