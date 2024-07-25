// init.js code 

const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
.then(()=>{
    console.log("Connection successful");
})
.catch((err)=>console.log(err));
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
};

let allChats = [
    {
        from: "Yuvraj",
        to: "Mohita",
        message: "Hey, how are you doing?",
        created_at: new Date()  
    },{
        from: "Mohita",
        to: "Yuvraj",
        message: "I am good, how are you?",
        created_at: new Date()
    },{
        from: "Rajvir",
        to: "Harsh",
        message: "Hello pha pha",
        created_at: new Date()
    },{
        from: "Harsh",
        to: "Rajvir",
        message: "Hello beta",
        created_at: new Date()
    }
];
Chat.insertMany(allChats);