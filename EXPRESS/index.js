// index.js code 

const express = require("express");
const app = express();
let port = 3000;
app.listen(port, ()=>{
    console.log("Server is running on port " + port);
});
app.get("/search", (req,res)=>{
    let {q} = req.query;
    res.send(`Search for ${q}`);
    console.log(req.query);
});