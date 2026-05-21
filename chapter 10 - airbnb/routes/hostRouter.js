//core module
const path = require('path');


//external module
const express = require('express');
const hostRouter = express.Router();



//local Module
const rootDir = require("../utils/pathUtil");


hostRouter.get("/add-home" ,(req,res,next) => {
    res.sendFile(path.join(rootDir,'views','addHome.html'));
    
    // res.send(
    //     `<h1> Register your home here: </h1>
    //      <form action = "/add-home" method="post">
    //       <input type = "text" name = "houseName"
    //       placeholder="Enter the name of your house"/>
    //       <input type ="submit"/>
        
    //     `);
})

hostRouter.post("/add-home" ,(req,res,next) => {
    res.sendFile(path.join(rootDir,'views','homeAdded.html'));
    console.log(req.body);
    // res.send(
    //     `<h1>Home Registered successfully </h1>
    //      <a href="/">Go to Home</a>
        
    //     `);
});



module.exports = hostRouter;