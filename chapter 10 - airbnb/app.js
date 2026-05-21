//core module
const path = require('path');


//external module

const express = require('express');

//local module
const userRouter = require("./routes/userRouter")
const hostRouter = require("./routes/hostRouter")
const rootDir = require("./utils/pathUtil");


const app = express();

app.use(express.urlencoded({ extended: true }));

// app.use((req,res,next) => {
//     console.log(req.url,req.method);
//     next(); 
// })

//app.use (express.urlencoded());

app.use("/host", hostRouter);

app.use(userRouter);

app.use((req,res,next) => {
    res.status(404).sendFile(path.join(rootDir,'views','404.html'));

    
})
  






const PORT = 3010;
app.listen(PORT,() => {
    console.log(`Server running on address http://localhost:${PORT}`);
});