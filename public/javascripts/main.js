(function () {
  var socket = io('http://localhost:3000');

  socket.on('sqs_message', function (data) {
    console.log(data);
    var ul = document.getElementById('sns-messages');
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(data.Body));
    ul.appendChild(li);
  });

  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('sns').addEventListener('submit', function (e) {
      var message = document.getElementById('message').value;
      socket.emit('sns_publish', { message: message });
      console.log('socket.io sns_publish', message)
      e.preventDefault();
    });
  });

  
})();