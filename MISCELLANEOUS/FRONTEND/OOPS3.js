class TwoDBox{
    constructor(name,l,b){
        this.name=name;
        this.length=l;
        this.breadth=b;
    }
    getArea(){
        let area = this.length * this.breadth;
        console.log(`Area of the box is ${area}`);
    }
};
class Square extends TwoDBox{
    constructor(a){
        super("Square",a,a);
    }
    area(){
        console.log(`Area of the ${this.name} is ${this.length * this.breadth}`);
    }
};
let sq1 = new Square(4);
sq1.area();