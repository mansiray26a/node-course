//External Module

const express = require('express');

const app = express();

app.use((req,res,next) => {
    console.log("First dummy middleware" , req.url,req.method);
    next();
});

app.use((req,res,next) => {
    console.log("Second dummy middleware" , req.url,req.method);
    next();
});

/*app.use((req,res,next) => {
    console.log("Third dummy middleware" , req.url,req.method);
    res.send("<h1> TIREDDDDDDD😩</h1>");
});*/

app.get("/",(req,res,next) => {
    console.log("HANDLING / for GET" , req.url,req.method);
    res.send("<h1> TIREDDDDDDD😩</h1>");
});

app.get("/contact-us",(req,res,next) => {
    console.log("HANDLING /contact-us for GET" , req.url,req.method);
    res.send(`<h1> Give me ur details</h1> 
        <form action = "/contact-us" method="POST">
        <input type="text" name="name" placeholder="Enter your name"/>
        <input type="email" name="email" placeholder="Enter your Email"/>
        <input type ="Submit"></input>
        </form>
        `);
});

app.post("/contact-us", (req,res,next)=> {
    console.log("HANDLING /Contact-us for POST" , req.url,req.method);
    res.send(`<h1>We will contact you shortly</h1>`);

});


const PORT = 3009;
app.listen(PORT , () => {
    //console.log(`server running on address http://localhost:${PORT}`);
    console.log(`server running on address http://localhost:${PORT}`);

})