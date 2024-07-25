// user.js code 
// One to Many - Approach 1

const mongoose = require("mongoose");
const {Schema} = require("mongoose");
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
    console.log("connected to db")
};
const userSchema = new Schema({
    username: String,
    addresses: [
        {
            // _id: false, set krne se id generate nahi hogi
            location: String,
            country: String
        }
    ]
});
const User = mongoose.model("User", userSchema);
const addUser = async()=>{
    let user1 = new User(
        {
            username: "Rajvir",
            addresses: [
                {
                    location: "Delhi",
                    country: "India"
                }   
            ]
        }
    );
    user1.addresses.push({
        location: "Goa",
        country: "India"
    });
    let result = await user1.save();
    console.log(result);
};
addUser();