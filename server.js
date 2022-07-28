var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let messages = [
    {from: {user: "June", time: "22:14"}, message: "In publishing and graphic design"},
    {from: {user: "Helen", time: "22:15"}, message: "Lorem ipsum is a placeholder text"},
    {from: {user: "Andre", time: "22:17"}, message: "commonly used to demonstrate the visual form of a document"},
    {from: {user: "Bart", time: "22:21"}, message: "or a typeface without relying on meaningful content."},
];

app.get("/messages", (req, res) => {
    res.send(messages);
});

app.post("/messages", (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});

var server = app.listen(3000, () => {
    console.log("the server is listening on http://localhost:" + server.address().port);
});
