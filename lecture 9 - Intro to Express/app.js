 //core Modules
 const http = require('http');

 //External Module
 const express = require('express');

 //Local Module
 //const requestHandler = require('./user');
  
 const app = express();

app.use((req,res,next) => {
    console.log("came in first middleware" , req.url,req.method);
    res.send ("<p> Welcome TO ......</p>")
    next();
});

app.use((req,res,next) => {
    console.log("came in second middleware" , req.url,req.method);
});

const server = http.createServer (app); 


const PORT = 4001;
server.listen(PORT,() => {
    console.log(`server running on address http://localhost:${PORT}`);
});
  