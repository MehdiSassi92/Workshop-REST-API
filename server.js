const express = require("express");
const app = express();
require("dotenv").config({path:"./config/.env"});
const mongoose = require("mongoose");
const User = require("./models/User.js");

const connectDB = require('./config/connectDB');

connectDB()

app.use(express.json())


//routes
app.post("/",async (req,res,next)=>{
    const newUser = new User(req.body);
    try{
        await newUser.save();
        res.status(201).json({message: "success"})
    }catch(error){
        res.status(500).send(error);
    }
});

app.get("/",async (req,res,next)=>{
    try{
        const users = await  User.find({});
        res.status(201).send(users);
    }catch(error){
        res.status(500).send(error);
    }
});


 
app.put("/:id",async (req,res,next)=>{
    try{
        const updateUser = await User.findOneAndUpdate(
            {id: req.params.id},
            {$set: req.body}
        );
        if(!updateUser){
            res.status(404).send("not found");
        }
        res.status(201).send(updateUser);

    }catch(error){
        res.status(500).send(error);
    }
});


app.delete("/:id",async (req,res,next)=>{
    try{await User.findOneAndDelete({id:req.params.id})
    res.status(201).send("success");}
    catch(error){
        res.status(500).send(error);
    }
});



const port = process.env.PORT;
app.listen(port,()=>console.log("server is running on port",port));