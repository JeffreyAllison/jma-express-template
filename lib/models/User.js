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

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM users');

    return rows.map((row) => new User(row));
  }
};
