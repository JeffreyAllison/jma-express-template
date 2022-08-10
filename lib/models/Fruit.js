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

  static async updateById(id, user_id, attrs) {
    const fruit = await Fruit.getById(id);
    if (!fruit) return null;
    const { name, color, edible_rind } = { ...fruit, ...attrs };
    const { rows } = await pool.query(
      `
      UPDATE fruits 
      SET    name=$3, color=$4, edible_rind=$5 
      WHERE  id=$1 
      AND    user_id=$2
      RETURNING *;
    `,
      [id, user_id, name, color, edible_rind]
    );
    return new Fruit(rows[0]);
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
  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM fruits 
      WHERE id = $1 
      RETURNING *
    `,
      [id]
    );
    return new Fruit(rows[0]);
  }
};
