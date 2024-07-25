// app.js code

const express = require("express");
const app = express();
const port = 3000;
const expressError = require("./expressError");

const checkToken = (req,res,next)=>{
    let {token} = req.query;
    if(token==="giveaccess"){
        next();
    }else{
        throw new expressError(401, "Access Denied!");
    };
};
app.get("/api", checkToken, (req, res)=>{
    res.send("Hi... I am the api restricted data");
});
app.use((err, req, res, next)=>{
    console.log("____________ERROR____________");
    next(err);
});
app.get("/admin", (req,res)=>{
    throw new expressError(403, "Access to admin is forbidden");
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});