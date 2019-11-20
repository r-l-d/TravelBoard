const express = require("express");
const app = express();
const db = require("./utils/db");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");
const { s3Url } = require("./config");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
app.use(express.static("./public"));
app.use(express.json());

app.get("/cards", (req, res) => {
    db.getCards().then(({ rows }) => {
        res.json(rows.reverse());
    });
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const { title, description, username } = req.body;
    const imageUrl = `${s3Url}${req.file.filename}`;
    db.addImage(imageUrl, username, title, description)
        .then(({ rows }) => {
            res.json({
                image: rows[0]
            });
        })
        .catch(err => {
            console.log(err);
        });
});

app.get("/modal/:id", (req, res) => {
    const { id } = req.params;
    db.getImage(id)
        .then(({ rows }) => {
            res.json(rows[0]);
        })
        .catch(err => {
            console.log(err);
        });
});

app.get("/modal/:id/comment", (req, res) => {
    //db get comments query
});

app.post("/modal/:id/comment", (req, res) => {
    //db post comment query here
});

app.listen(8080, () => console.log("Listening"));
