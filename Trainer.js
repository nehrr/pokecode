const fs = require("fs");
const Person = require("./Person");

class Trainer extends Person {
  constructor(firstname, age, trainer) {
    if (trainer !== undefined) {
      super(trainer.firstname, trainer.age);

      this.id = trainer.id;
      this.pokemons = trainer.pokemons;
      this.startDate = trainer.startDate;
    } else {
      super(firstname, age);

      if (typeof Trainer.nb_id == "undefined") {
        Trainer.nb_id = 1;
      }

      this.firstname = firstname;
      this.age = age;
      this.id = Trainer.nb_id++;
      this.pokemons = [];
      this.startDate = new Date()
        .toISOString()
        .replace(/(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+).*/, "$1-$2-$3");
    }

    super.hi();

    // console.log(
    //   `••[[ Here come's a new challenger ->> ${this.id}::${this.firstname}`
    // );
  }

  hey() {
    let pokes = this.pokemons.length > 1 ? "pokemons" : "pokemon";
    console.log(
      `••[[ Hi, I'm ${this.firstname} [ ${
        this.pokemons.length
      } ${pokes} ] and I will be the best virtual pokemon master. `
    );
  }

  serialize() {
    const serialized = `pokestory.trainer${this.id}.json`;
    const data = {
      id: this.id,
      firstname: this.firstname,
      age: this.age,
      pokemons: this.pokemons.map(pokemon => pokemon.number),
      startDate: this.startDate
    };

    fs.writeFileSync(serialized, JSON.stringify(data, null, 2));
  }

  start(pokemon) {
    this.pokemons.push(pokemon);
    console.log(
      `Yeaaaaaaah, I'm ${this.firstname} and I have my first pokémon!`
    );
    pokemon.yell();
  }
}

module.exports = Trainer;
