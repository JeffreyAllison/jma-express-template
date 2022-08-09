const bcrypt = require('bcrypt');
const HttpError = require('../utils/HttpError.js');
const pool = require('../utils/pool');

module.exports = class User {
  id;
  email;
  #passwordHash;

  constructor({ id, email, password_hash }) {
    this.id = id;
    this.email = email;
    this.#passwordHash = password_hash;
  }

  static async insert({ email, password }) {
    if (email.length <= 6) {
      throw new Error('Invalid email');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    try {
      const { rows } = await pool.query(
        `
        INSERT INTO users (email, password_hash)
        VALUES ($1, $2)
        RETURNING *
      `,
        [email, passwordHash]
      );

      return new User(rows[0]);
    } catch (err) {
      if (err.code === '23505') {
        throw new HttpError('Email already exists', 400);
      }
      throw err;
    }
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM users');

    return rows.map((row) => new User(row));
  }
};