var spicedPg = require("spiced-pg");
var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/imageboard"
);

exports.getCards = function getCards() {
    return db.query("SELECT * FROM images");
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
        "INSERT INTO comments(username, comment_text,image_id) VALUES ($1, $2, $3)",
        [username, comment_text, image_id]
    );
};
