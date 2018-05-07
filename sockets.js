const Consumer = require('sqs-consumer');
const AWS = require('aws-sdk');

const config = require('./config');
const snsPublish = require('./lib/publish');

AWS.config.update({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.region,
});

function handler(socket) {
  socket.emit('news', { hello: 'world' });
  
  const app = Consumer.create({
    queueUrl: config.aws.sqsQueueUrl,
    handleMessage: (message, done) => {
      console.log(`Emitting message: ${message.Body}`);
      socket.broadcast.emit('sqs_message', message);
      done();
    },
    sqs: new AWS.SQS(),
  });

  app.on('error', (err) => {
    console.log(err.message);
  });

  socket.on('sns_publish', (data) => {
    console.log(data);
    snsPublish(data.message);
  });

  app.start();
}

module.exports = handler;