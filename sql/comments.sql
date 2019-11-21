DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    comment_text VARCHAR(600) NOT NULL,
    image_id INT REFERENCES images(id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO comments (username, comment_text, image_id)
VALUES ('Alexander Hamilton','So American', 15);


INSERT INTO comments (username, comment_text, image_id)
VALUES ('Ross','That is awesome', 15);
