CREATE TABLE people (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL
);

INSERT INTO
    people (first_name)
VALUES
    ('kevin'),
    ('carter'),
    ('bodhi'),
    ('aimee'),
    ('john');