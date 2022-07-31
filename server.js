var express = require("express");
var bodyParser = require("body-parser");
var url = require('url');
var serverFuncs = require("./server.functions.js");

var app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let messages = [
    // {id: serverFuncs.generateRandomString(), from: {user: "June", time: "22:14"}, message: "In publishing and graphic design"},
    // {id: serverFuncs.generateRandomString(), from: {user: "Helen", time: "22:15"}, message: "Lorem ipsum is a placeholder text"},
    // {id: serverFuncs.generateRandomString(), from: {user: "Andre", time: "22:17"}, message: "commonly used to demonstrate the visual form of a document"},
    // {id: serverFuncs.generateRandomString(), from: {user: "Bart", time: "22:21"}, message: "or a typeface without relying on meaningful content."},
];

app.get("/messages", (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    let matches = [];
    if (queryObject.after) {
        let targetId = queryObject.after;
        let isMessageFound = false;
        for (let message of messages) {
            if (isMessageFound) {
                matches.push(message);
            }
            else if (targetId == message.id) {
                isMessageFound = true;
            }
        }
    } else {
        matches = messages;
    }
    res.send(matches);
});

app.post("/messages", (req, res) => {
    let message = req.body;
    let date = new Date();
    let time = [
        date.getHours().toString().padStart(2, "0"),
        date.getMinutes().toString().padStart(2, "0"),
    ].join(":");
    message.from.time = time;
    // message.id = serverFuncs.generateRandomString();
    messages.push(message);
    res.sendStatus(200);
});

var server = app.listen(3000, () => {
    console.log("the server is listening on http://localhost:" + server.address().port);
});
