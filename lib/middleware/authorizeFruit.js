const Fruit = require('../models/Fruit');

module.exports = async (req, res, next) => {
  try {
    const fruit = await Fruit.getById(req.params.id);
    if (!fruit || fruit.user_id !== req.user.id) {
      throw new Error('You do not have access to view this page');
    }
    next();
  } catch (e) {
    e.status = 403;
    next(e);
  }
};
