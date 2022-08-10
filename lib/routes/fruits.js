const { Router } = require('express');
const Fruit = require('../models/Fruit');
const authorizeFruit = require('../middleware/authorizeFruit');

module.exports = Router()
  .param('id', (req, res, next, id) => {
    req.id = id;
    next();
  })

  .post('/', async ({ body, user }, res, next) => {
    try {
      const fruit = await Fruit.insert({ ...body, user_id: user.id });
      res.json(fruit);
    } catch (e) {
      next(e);
    }
  })

  .get('/:id', authorizeFruit, async ({ id }, res, next) => {
    try {
      const fruit = await Fruit.getById(id);
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
  })
  .put('/:id', authorizeFruit, async ({ id, user, body }, res, next) => {
    try {
      const fruit = await Fruit.updateById(id, user.id, body);
      res.json(fruit);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', authorizeFruit, async ({ id }, res, next) => {
    try {
      const fruit = await Fruit.delete(id);
      res.json(fruit);
    } catch (e) {
      next(e);
    }
  });
