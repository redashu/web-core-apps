const express = require('express');
const path =  require('path');
const bcrypt = require('bcrypt');
const collection = require("./config");

// console.log("hello from nodejs");

 
const app = express();
// convert data into json 
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// using ejs as view engine
app.set('view engine','ejs');
// calling static file css
app.use(express.static("public"));

// creating pages 
app.get("/",(req,res) =>  {
    res.render("login");
});

app.get("/signup",(req,res) => {
    res.render("signup")
});

// register user 
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }
    // checking if user is already existing 
    const existingUser = await collection.findOne({name: data.name});
    if(existingUser) {
        res.send("username is already exist try other name ");
    }else {
        // encrypting password 
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(data.password,saltRounds);
    data.password = hashedPass ;
        // sending data to db 
    const userdata = await collection.insertMany(data);
    console.log(userdata);
    }
    
});

// user login 
app.post("/login" ,async (req, res) => {
    try{
        const check = await collection.findOne({name: req.body.username});
        if(!check){
            res.send("user not found in Database");
        }
        // checking password 
        const checkPass = await bcrypt.compare(req.body.password, check.password);
        if(checkPass){
            res.render("home");
        }else {
            res.send("Wrong password ");
        }

    }catch {
        res.send("Wrong details ");
    }
});

const port = 5000;

// running app 
app.listen(port,() => {
    console.log('hello world from Nodejs');
    console.log(`server is running on : ${port}`);
});