class Animal {
  constructor(name, size, weight) {
    this.name = name;
    this.size = size;
    this.weight = weight;
  }

  yell() {
    console.log(`•••••• ${this.name} is yelling:`);
  }
}

module.exports = Animal;
