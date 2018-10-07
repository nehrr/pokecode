const fs = require("fs");
const path = require("path");
const Trainer = require("./Trainer");
const Pokemon = require("./Pokemon");
const PokemonFactory = require("./PokemonFactory");

if (process.argv.length !== 3) {
  console.log("usage: node main.js <FILENAME>");
  process.exit(1);
}

const files = fs.readdirSync(__dirname);
let filename;

if (files.some(file => file.match(/(^pokestory.trainer[0-9].(JSON|json))/g))) {
  filename = files.filter(file =>
    file.match(/(^pokestory.trainer[0-9].(JSON|json))/g)
  );
} else {
  filename = process.argv[2];

  const match = filename.match(/\.(json|JSON)$/);

  if (!match) {
    console.log(`error: incorrect filetype`);
    process.exit(0);
  }

  if (!fs.existsSync(filename)) {
    console.log(`error: file ${filename} doesn't exist`);
    process.exit(0);
  }
}

function main(file) {
  let filename;
  let data = [];
  let json;
  if (typeof file !== "object") {
    filename = file;
    data = fs.readFileSync(filename, "utf8");
    json = JSON.parse(data);
  } else {
    for (const aFile of file) {
      let obj = fs.readFileSync(aFile, "utf8");
      obj = JSON.parse(obj);
      data.push(obj);
    }
    json = data;
    filename = "save";
  }

  console.log(`••[[ Reading new json data information:`);

  let pokemons = [];
  for (let name of ["Carapuce", "Bulbizarre", "Salamèche"]) {
    pokemons.push(PokemonFactory.create(name));
  }

  switch (filename) {
    case "trainers.json":
      for (let [id, trainer] of json.entries()) {
        let aTrainer = new Trainer(trainer.firstname, trainer.age);

        let randomPokemonidx = Math.floor(Math.random() * pokemons.length);

        aTrainer.hey();
        aTrainer.start(pokemons[randomPokemonidx]);

        aTrainer.serialize();
      }
      break;

    case "save":
      for (let trainer of json) {
        let trainerPokemons = [];
        let aTrainer = new Trainer(null, null, trainer);
        for (const nb of aTrainer.pokemons) {
          trainerPokemons.push(PokemonFactory.create(nb));
        }
      }
      break;
    default:
  }
}

main(filename);
