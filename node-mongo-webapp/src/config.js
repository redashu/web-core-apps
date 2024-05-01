const { name } = require('ejs');
const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/logindb");

// checking connection 
connect.then(() => {
    console.log("db connection is success ");
});

connect.catch(() => {
    console.log("db is not available ");
})

// creating schema 
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// creating model 
const collection = new mongoose.model("ashulogin",LoginSchema);
module.exports = collection;