class Person {
  constructor(firstname, age) {
    this.firstname = firstname;
    this.age = age;
  }

  hi() {
    console.log(`Hello, my name is ${this.firstname} and I'm ${this.age}`);
  }
}

module.exports = Person;
