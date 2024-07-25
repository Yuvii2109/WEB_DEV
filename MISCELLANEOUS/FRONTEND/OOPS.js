// OOPS.js code 

// Inheritance 

class Person{
    constructor(name,age){
        console.log("Inside Person");
        this.name = name;
        this.age = age;
    }
    talk(){
        console.log(`Hi! My name is ${this.name} and I am ${this.age} year old`);
    }
};
class Student extends Person{
    constructor(name,age,marks){
        console.log("Inside Student");
        super(name,age); // Parent class constructor is being called
        this.marks = marks;
    }
};
class Teacher extends Person{
    constructor(name,age,subject){
        console.log("Inside Teacher");
        super(name,age); // Parent class constructor is being called
        this.subject = subject;
    }
};
let stu1 = new Student("Yuvraj", 20, 100);
stu1.talk();
let teacher1 = new Teacher("Shradha", 25, "Web-Dev and DSA");
teacher1.talk();