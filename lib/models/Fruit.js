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
