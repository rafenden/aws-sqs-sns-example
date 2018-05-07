const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const util = require('util');

const config = require('../config');

router.get('/', function (req, res, next) {
  res.render('publish', { title: 'Express' });
});

router.post('/', (req, res) => {
  
  AWS.config.update({
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
    region: config.aws.region,
  });
  
  const sns = new AWS.SNS();
  
  const publishParams = {
    TopicArn: config.aws.snsTopicArn,
    Message: req.body.message,
  };

  sns.publish(publishParams, function (err, data) {
    if (err) {
      console.error(err);
      res.status(500).end();
    }
    else {
      console.log(data);
      res.redirect('/publish');
    }
  });
});

module.exports = router;