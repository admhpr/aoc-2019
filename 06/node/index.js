const fs = require("fs");
const path = require("path");
const inputPath = path.join(__dirname, "input");


function execute() {
  const system = new Map();
  const distancesFromCentre = new Map();

  const input = fs.readFileSync(inputPath, "utf8").split("\n");

  input.forEach(orbitInfo => {
    setValues(orbitInfo, system);
  });
  for (const [satellite, parent] of system){
      if(!distancesFromCentre.has(satellite)){
        distancesFromCentre.set(satellite, totalOrbits(system, distancesFromCentre, satellite))
      }

  }
  console.log(`part 1: ${[...distancesFromCentre.values()].reduce((acc, cur) => acc + cur)}`)
  // part 2
  const myDistanceFromCentre = new Map()
  let planet = "YOU"
  let myDistanceFromThisPlanet = 0;
  // my distance to COM
  while(system.has(planet)){
      myDistanceFromCentre.set(planet, myDistanceFromThisPlanet)
      planet = system.get(planet)
      myDistanceFromThisPlanet += 1;
  }

  // find the common meeting point (planet) of paths back to COM
  let currentPlanet = "SAN"
  let santasDistanceFromThisPlanet = 0;
  // stops an accidental infinite loop
  while(system.has(currentPlanet) && !myDistanceFromCentre.has(currentPlanet)){
      currentPlanet = system.get(currentPlanet)
      santasDistanceFromThisPlanet += 1
  }

  // distance between SAN and YOU is the distance from SAN to child plus the distance from YOU to child.
  const distanceApart = santasDistanceFromThisPlanet + myDistanceFromCentre.get(currentPlanet)
  console.log(`part 2: ${distanceApart - 2}`) // remove YOU and SAN
  
}

function totalOrbits(system, distancesFromCentre, child){
    if(!distancesFromCentre.has(child)){
        if(system.get(child) === "COM"){
            distancesFromCentre.set(child, 1)
        }else{
            // grabs the parents distance and adds one e.g COM --> SUN --> EARTH --> MOON
            // if child is MOON we know the EARTH is 2 away to 1 + 2 is the MOON's distance
            distancesFromCentre.set(child, 1 + totalOrbits(system, distancesFromCentre, system.get(child)))
        }
    }
    return distancesFromCentre.get(child)
}

function setValues(orbitInfo, system) {
  const [parentPlanet, satellite] = orbitInfo.split(")");
  // parent is the key, COM will not be in the keys
  system.set(satellite, parentPlanet);
}

execute();

