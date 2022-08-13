-- the setup sql file creates the table template for your data. 

DROP TABLE IF EXISTS fruits;
DROP TABLE IF EXISTS users; 

-- the drop table if exists command instructs postgres/beekeeper interface to delete specified tables if they already exist, in this instance a (new) fruits and users table are being created

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password_hash VARCHAR NOT NULL
);

CREATE TABLE fruits (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT,
  name VARCHAR NOT NULL,
  edible_rind BOOLEAN NOT NULL DEFAULT(false),
  color VARCHAR NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
)

-- the two sql tables are created here with the rows being named "id/email/name/edible_rind" and the type of row being defined "BIGINT/VARCHAR/BOOLEAN".  A foreign key is also being established on table fruits to associated fruit table user_id row with users table id row.