var spicedPg = require("spiced-pg");
var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/imageboard"
);

exports.getCards = function getCards() {
    return db.query("SELECT * FROM images");
};
