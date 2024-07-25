// index.js code 

const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

// A chat will have - id, from, to, message, created_at

main()
.then(()=>{
    console.log("Connection successful");
})
.catch((err)=>console.log(err));
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
};

// Index route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs", {chats});
});

// New route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

// Create route
app.post("/chats", (req, res) => {
    let {from, to, message} = req.body;
    let newChat = new Chat({
        from: from, 
        to: to, 
        message: message, 
        created_at: new Date()
    });
    console.log(newChat);
    newChat.save()
    .then((res)=>{
        console.log("Chat saved successfully");
    })
    .catch((err)=>{
        console.log(err);
    });
    res.redirect("/chats");
});

//Edit Route
app.get("/chats/:id/edit", async (req, res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);   
    res.render("edit.ejs", {chat});
});
//Update Route
app.put("/chats/:id", async (req, res) => {
    let {id} = req.params;
    let {message: newMessage} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, 
        {message: newMessage, created_at: new Date()},
        {runValidators: true},
        {new: true}
    );
    console.log(updatedChat);
    res.redirect("/chats");
});

// Delete route
app.delete("/chats/:id", async (req, res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});