const Animal = require("./Animal");

class Pokemon extends Animal {
  constructor(number, name, size, weight, type, attacks) {
    super(name, size, weight);

    this.number = number;
    this.type = type;
    this.level = 3;
    this.is_yelling = false;
    this.attacks = attacks;
  }

  yell() {
    this.is_yelling == true
      ? // ? super.yell() + console.log(`••[[ $!%#@? ${this.name.toUpperCase()}`)
        super.yell() + console.log(`~~~ ${this.name.toUpperCase()} ~~~`)
      : null;
  }

  dump() {
    let dump = {};
    let value;
    process.stdout.write(`••[[ ${this.name.toUpperCase()} DUMP`);
    for (const key in this) {
      if (
        typeof this[key] === "string" &&
        this[key].match(/^[0-9.]*$/g) &&
        key != "number"
      ) {
        value = parseFloat(this[key]).toPrecision(2);
        dump[key] = value;
      } else {
        value = this[key];
        dump[key] = value;
      }
    }
    process.stdout.write("\n" + util.inspect(dump) + "\n");
  }
}

module.exports = Pokemon;
