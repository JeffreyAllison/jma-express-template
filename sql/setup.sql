DROP TABLE IF EXISTS fruits;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password_hash VARCHAR NOT NULL
);

CREATE TABLE fruits (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT ,
  name VARCHAR NOT NULL,
  edible_rind BOOLEAN NOT NULL DEFAULT(false),
  color VARCHAR NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
)