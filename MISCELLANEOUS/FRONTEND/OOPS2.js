class Animals{
    // Base class - Parent class
    constructor(name,type){
        this.name = name;
        this.type = type;
    }
    eat(){
        console.log("Eating");
    }
};
class Dog extends Animals{
    // Child class - Sub class
    constructor(name,type){
        super(name,type);
    }
    bark(){
        console.log(`My name is ${this.name} and I am a ${this.type} dog and I Bark.`);
    }
};
class Cat extends Animals{
    // Child class - Sub class
    constructor(name,type){
        super(name,type);
    }
    meow(){
        console.log(`My name is ${this.name} and I am a ${this.type} cat and I Meow.`);
    }
};
let dog1 = new Dog("Husku", "Husky");
let cat1 = new Cat("Mia", "Persian");
console.log(dog1.eat());
console.log(dog1.bark());
console.log(cat1.meow());