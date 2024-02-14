var express = require('express');
var router = express.Router();

const { generateToken } = require('../utils/csrfSetup');

router.get('/', (req, res, next) => {
  res.render('index', { csrfToken: generateToken(req, res) });
});

module.exports = router;
