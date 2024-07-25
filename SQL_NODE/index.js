// index.js code 

const {faker} = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ConfidentialHai",
  database: "app"
});

let getRandomUser = () => {
  return [
    faker.datatype.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password()
  ];
};

// Fetch and show total number of users on the app
app.get("/", (req,res)=>{
  let q = `SELECT count(*) FROM user`;
  try{
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      // This line accesses the first element of the result array and 
      // retrieves the value associated with the "count(*)" key.
      // This value represents the count of records in the user table.

      console.log(result); // Output - [ { 'count(*)': 23 } ]      
      res.render("home.ejs", {count});
  });
  }catch(err){
    res.send(err);
  }
});

// Fetch and show id, username, email of all users
app.get("/user", (req,res)=>{
  let q = `SELECT * FROM user`;
  try{
    connection.query(q, (err, result) => {
      if (err) throw err;
      let data = result;
      console.log(data);
      res.render("user.ejs", {data});
  });
  }catch(err){
    res.send(err);
  }
});

// Edit username 
app.get("/user/:id/edit", (req,res)=>{
    let {id} = req.params;
    let q = `SELECT * FROM user WHERE id = '${id}'`;
    try{
      connection.query(q, (err, result) => {
        if (err) throw err;

        // Since data hmara array ke form main aa rha hai 
        // isliye humne result[0] likha hai

        let data = result[0];
        console.log(data);
        res.render("edit.ejs", {data});
      });
    }catch(err){
      res.send(err);
    };
});
app.patch("/user/:id", (req,res)=>{
  let {id} = req.params;
  let {password: formPass, username: newUser} = req.body;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try{
    connection.query(q, (err, result) => {
      if (err) throw err;
      let data = result[0];
      if(formPass != data.password){
        res.send("Incorrect password");
      }else{
        let q2 = `UPDATE user SET username = '${newUser}' WHERE id = '${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect("/user");
        });
      }});
  }catch(err){
    res.send(err);
  };
});

// Adding a new user to the database
app.get("/user/new", (req, res) => {
  res.render("new.ejs");
});
app.post("/user/new", (req, res) => {
  let { username, email, password } = req.body;
  let id = uuidv4();
  //Query to Insert New User
  let q = `INSERT INTO user (id, username, email, password) VALUES ('${id}','${username}','${email}','${password}') `;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log("Added new user");
      res.redirect("/user");
    });
  } catch (err) {
    res.send("some error occurred");
  }
});

// Delete a person from the user
app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let data = result[0];
      console.log(data);
      res.render("delete.ejs", { data });
    });
  } catch (err) {
    res.send("some error with DB");
  }
});
app.delete("/user/:id/", (req, res) => {
  let { id } = req.params;
  let { password } = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let data = result[0];
      if (data.password != password) {
        res.send("WRONG Password entered!");
      } else {
        let q2 = `DELETE FROM user WHERE id='${id}'`; //Query to Delete
        connection.query(q2, (err, result) => {
          if (err) throw err;
          else {
            console.log(result);
            console.log("deleted!");
            res.redirect("/user");
          }
        });
      }
    });
  } catch (err) {
    res.send("some error with DB");
  }
});

app.listen(port, ()=>{
  console.log("Server is running on port 3000");
});

// connection.end(); kahin likhne ki zroort nahi kyuki connection apne aap khatam 
// ho jaayega jb app ka function complete ho jayega ya response chala jayega
