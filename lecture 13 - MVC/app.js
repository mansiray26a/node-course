//core module
const path = require('path');

//external module
const express = require('express');

//local module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const errorsController = require("./controllers/errors");
const rootDir = require("./utils/pathUtil");

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));

app.use("/host", hostRouter);
app.use(storeRouter);

app.use(errorsController.get404);

const PORT = 3010;
app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
});