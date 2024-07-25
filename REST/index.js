// index.js code 

const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const {v4 : uuidv4} = require("uuid"); // After importing uuid function throught the terminal by "npm install uuid"
// uuidv4(); Yahan use nahi krenge
const methodOverride = require("method-override"); 

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));

let posts = [
    {
        id: uuidv4(),
        username: "yuvii2109",
        content: "My first post",
    },{
        id: uuidv4(),
        username: "rajjii1604",
        content: "I am in class 5th",
    },{
        id: uuidv4(),
        username: "minky0510",
        content: "Hii my babies",
    }
];

app.get("/posts", (req,res)=>{
    res.render("index.ejs", {posts});
});
app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");
})
app.get("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    if (post) {
        res.render("show.ejs", { post });
    } else {
        res.status(404).send("Post not found");
    }
})
app.post("/posts", (req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});
app.patch("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    if (post) {
        post.content = newContent;
        res.redirect("/posts");
    } else {
        res.status(404).send("Post not found");
    }
});
app.delete("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    if (post) {
        posts.splice(posts.indexOf(post), 1);
        res.redirect("/posts");
    } else {
        res.status(404).send("Post not found");
    }
});

// Deletion method-2
// app.delete("/posts/:id", (req,res)=>{
//     let {id} = req.params;
//     let post = posts.find((p) => id === p.id);
//     if (post) {
//         posts = posts.filter((p) => id !== p.id);
//         res.redirect("/posts");
//     } else {
//         res.status(404).send("Post not found");
//     }
// });

app.get("/posts/:id/edit", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    if (post) {
        res.render("edit.ejs", { post });
    } else {
        res.status(404).send("Post not found");
    }
});
app.listen(port, () => {
    console.log("Server is running on port " + port);
});