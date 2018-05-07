const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const util = require('util');

const config = require('../config');

function publish(message) {
  
  AWS.config.update({
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
    region: config.aws.region,
  });
  
  const sns = new AWS.SNS();
  
  const publishParams = {
    TopicArn: config.aws.snsTopicArn,
    Message: message,
  };

  sns.publish(publishParams, (err, data) => {
    if (err) {
      console.error(err);
    }
    else {
      console.log(data);
    }
  });
};

module.exports = publish;