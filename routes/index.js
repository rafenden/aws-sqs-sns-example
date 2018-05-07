const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const util = require('util');

const config = require('../config');

router.get('/', function (req, res, next) {
  res.render('index');
});

module.exports = router;