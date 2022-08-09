const pool = require('../utils/pool');

module.exports = class Fruit {
  id;
  name;
  edible_rind;
  user_id;
  color;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.color = row.color;
    this.user_id = row.user_id;
    this.edible_rind = row.edible_rind;
  }
  static async insert({ name, color, user_id }) {
    const { rows } = await pool.query(
      `
      INSERT INTO fruits (name, color, user_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `,
      [name, color, user_id]
    );

    return new Fruit(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM   fruits
      WHERE  id=$1
    `,
      [id]
    );

    if (!rows[0]) {
      return null;
    }
    return new Fruit(rows[0]);
  }

  static async getAll(user_id) {
    const { rows } = await pool.query(
      `
      SELECT * 
      FROM fruits 
      WHERE user_id = $1 
    `,
      [user_id]
    );
    return rows.map((fruit) => new Fruit(fruit));
  }
};
