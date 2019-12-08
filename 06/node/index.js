const fs = require("fs");
const path = require("path");
const inputPath = path.join(__dirname, "input-test");


function execute() {
  const system = new Map();
  const input = fs.readFileSync(inputPath, "utf8").split("\n");
  system.set("COM", createPlanet([null, "COM"]));
  input.forEach(orbitInfo => {
    setValues(orbitInfo, system);
  });
  for (const [_, planet] of system) {
    if (planet.orbits) {
      system.get(planet.orbits).addIndirect(planet.name);
    }
  }
  const total = calculateOrbits(system)
}

function calculateOrbits(system){
    let total;
    for(const [planet, info] of system){
        const planetsTotal = 0;
        info.children.forEach(child => {
            console.log(planet, child)
        })
    }
}

function createPlanet([directOrbit, satellite]) {
  return {
    name: satellite,
    orbits: directOrbit,
    children: [],
    addIndirect(planet) {
      this.children.push(planet);
    }
  };
}

function setValues(orbitInfo, system) {
  const [planet, orbitingPlanet] = orbitInfo.split(")");
  if (!system.has(orbitingPlanet)) {
    system.set(orbitingPlanet, createPlanet([planet, orbitingPlanet]));
    return;
  }
}

execute();
