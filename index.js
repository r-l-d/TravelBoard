const express = require("express");
const app = express();
const db = require("./utils/db");

app.use(express.static("./public"));

app.get("/animals", (req, res) => {
    let animals = [
        {
            name: "squid",
            emoji: "🦑"
        },
        {
            name: "ewe",
            emoji: "🐑"
        }
    ];
    res.json(animals);
});

app.get("/cards", (req, res) => {
    db.getCards().then(({ rows }) => {
        console.log("rows: ", rows);
        res.json(rows);
    });
});

app.listen(8080, () => console.log("Listening"));
