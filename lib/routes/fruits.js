const { Router } = require('express');
const Fruit = require('../models/Fruit');

module.exports = Router()
  .param('id', (req, res, next, id) => {
    req.id = id;
    next();
  })

  .get('/', async ({ user }, res, next) => {
    try {
      const fruits = await Fruit.getAll(user.id);
      res.json(fruits);
    } catch (e) {
      next(e);
    }
  });
