// BAKCEND index.js code 

const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.get("/register", (req,res)=>{
    let {user,password} = req.query;
    res.send(`Welcome ${user}!`);
    console.log(req.query);
});
app.post("/register", (req,res)=>{
    let {user,password} = req.body;
    res.send(`Welcome ${user}!`);
    console.log(req.body);
});
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});

// Here we have used app.use(express.urlencoded({extended: true})); to
// parse the data in the body of the request. This is required for the
// req.query object to be populated with the data from the query string.
// We also used app.use(express.json()); to parse the data in the body of
// the request as JSON. This is required for the req.body object to be
// populated with the data from the request body.