//core module
const path = require('path');


//external module

const express = require('express');

//local module
const userRouter = require("./routes/userRouter")
const hostRouter = require("./routes/hostRouter")
const rootDir = require("./utils/pathUtil");


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));

// app.use((req,res,next) => {
//     console.log(req.url,req.method);
//     next(); 
// })

//app.use (express.urlencoded());

app.use("/host", hostRouter);

app.use(userRouter);


app.use(express.static(path.join(rootDir, 'public',)))

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
})







const PORT = 3010;
app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
});