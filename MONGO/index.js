// index.js code 

const mongoose = require("mongoose");

main()
.then(()=>{
    console.log("connected to db");
})
.catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
});
const User = mongoose.model("User", userSchema);
const Employee = mongoose.model("Employee", userSchema);

Employee.findOneAndUpdate({name: "Swati"}, {age: 21}, {new: true}).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});

// What is the purpose of {new: true} - 
// It returns the updated document. If we don't use {new: true} then it will
// return the document before the update because the default set value of 
// {new} is false.