
const fs = require("fs");
const path = require("path");
const inputPath = path.join(__dirname, "input-test");

const system = new Map();

function execute(){
    const input = fs.readFileSync(inputPath, "utf8").split("\n");
    system.set("COM", createPlanet([null, "COM"]))
    input.forEach(orbitInfo => {
        setValues(orbitInfo)
    })
}

function createPlanet([directOrbit, satellite]){
    return {
        name: satellite,
        orbits: directOrbit,
    }
}

function setValues(orbitInfo){
    const [planet, orbitingPlanet] = orbitInfo.split(')');
    if(!system.has(orbitingPlanet)){
        system.set(orbitingPlanet, createPlanet([planet, orbitingPlanet]))
        return
    }
}

execute()
console.log(system)