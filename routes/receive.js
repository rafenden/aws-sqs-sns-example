const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const util = require('util');

const config = require('../config');

router.get('/', function (req, res, next) {
  AWS.config.update({
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
    region: config.aws.region,
  });

  const sqs = new AWS.SQS();

  const receiveMessageParams = {
    QueueUrl: config.aws.sqsQueueUrl,
    MaxNumberOfMessages: 10,
  };

  const messages = [];

  sqs.receiveMessage(receiveMessageParams, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500);
      next(err);
    }
    else {
      console.log(data);

      res.render('receive', { messages: data.Messages });
    }
  });
});

module.exports = router;