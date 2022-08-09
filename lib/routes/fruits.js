const { Router } = require('express');
const Fruit = require('../models/Fruit');

module.exports = Router()
  .post('/', async ({ body, user }, res, next) => {
    try {
      const fruit = await Fruit.insert({ ...body, user_id: user.id });
      res.json(fruit);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async ({ user }, res, next) => {
    try {
      const fruits = await Fruit.getAll(user.id);
      res.json(fruits);
    } catch (e) {
      next(e);
    }
  });
