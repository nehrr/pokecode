const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "pokedex.json");
const Pokemon = require("./Pokemon");

class PokemonFactory {
  static create(name) {
    let pokemon;
    let is_yelling;
    const data = fs.readFileSync(file, "utf8");
    const pokemons = JSON.parse(data);

    if (/[0-9]{3}/.test(name)) {
      is_yelling = false;
      pokemon = pokemons.find(item => item["numéro"] == name);
    } else {
      is_yelling = true;
      pokemon = pokemons.find(item => item.nom == name);
    }

    const nb = pokemon["numéro"];
    const nom = pokemon["nom"];
    const size = pokemon["taille"];
    const weight = pokemon["poids"];
    let type = [];
    let attacks;

    for (const key in pokemon) {
      if (key.match(/(type[0-9])/)) {
        type.push(pokemon[key]);
      }

      if (key.match(/(attaques)/)) {
        let allAttacks = pokemon[key];

        allAttacks.find(item => {
          if (item.niveau.match(/(Départ)/)) {
            item.niveau = "N.3";
          }
        });

        attacks = allAttacks;
      }
    }

    pokemon = new Pokemon(nb, nom, size, weight, type, attacks);
    pokemon.yell();
    pokemon.is_yelling = is_yelling;
    return pokemon;
  }
}

module.exports = PokemonFactory;
