// Math code 

const sum = (a,b) => a+b;
const sub = (a,b) => a-b;
const mul = (a,b) => a*b;
const div = (a,b) => a/b;
const mod = (a,b) => a%b;
const pow = (a,b) => a**b;
const sqrt = (a) => Math.sqrt(a);
const log = (a) => Math.log(a);
const g = 9.8;
const pi = 3.14;
const e = 2.71828;

let obj = {
    sum: sum,
    sub: sub,
    mul: mul,
    div: div,
    mod: mod,
    pow: pow,
    sqrt: sqrt,
    log: log,
    g: g,
    pi: pi,
    e: e
};
module.exports = obj;

// When there's no value assigned to the module.exports
// it will return an empty object