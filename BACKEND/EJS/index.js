// index.js code 

const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.listen(port, (req,res)=>{
    console.log("Server is running on port 3000");
});
app.get("/ig/:username", (req,res)=>{
    let {username} = req.params;
    const instaData = require("./data.json");
    const data = instaData[username];
    if(data){
        res.render("instagram.ejs", {data});
    }else{
        res.render("404.ejs");
    }
});