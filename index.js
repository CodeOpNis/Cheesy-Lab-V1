const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();
const port = 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log("server is running on port " + port);
});

app.get('/', (req, res) => {
    res.send('Welcome To Cheesy Lab!');
});

app.get("/lab", (req, res) => {
    res.render("lab");
});