const { Router } = require('express');
const authenticate = require('../middleware/authenticate');

module.exports = Router().get('/verify', authenticate, (req, res) => {
  res.json(req.user);
});
