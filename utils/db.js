var spicedPg = require("spiced-pg");
var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/imageboard"
);

exports.getCards = function getCards() {
    return db.query("SELECT * FROM images LIMIT 15");
};

exports.addImage = function addImage(url, username, title, description) {
    return db.query(
        "INSERT INTO images(url, username, title, description) VALUES ($1, $2, $3, $4) RETURNING *",
        [url, username, title, description]
    );
};

exports.getImage = function getImage(id) {
    return db.query("SELECT * FROM images WHERE id = $1", [id]);
};

exports.getComments = function getComments(id) {
    return db.query(
        "SELECT comment_text, username, created_at FROM comments WHERE image_id = $1",
        [id]
    );
};

exports.addComment = function addComment(username, comment_text, image_id) {
    return db.query(
        "INSERT INTO comments(username, comment_text,image_id) VALUES ($1, $2, $3) RETURNING created_at",
        [username, comment_text, image_id]
    );
};

exports.getNextCards = function getNextCards(id) {
    return db.query("SELECT * FROM images WHERE id < $1 LIMIT 15", [id]);
};

// SELECT images.*, (
//     SELECT id FROM images
//     ORDER BY id ASC
//     LIMIT 1
// ) AS 'lowestId' FROM images
// WHERE ID < $1
// ORDER BY id DESC
// LIMIT 10;
