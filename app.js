var config = require('./config')
  , amqp = require('amqp')
  , webshot = require('webshot')
  , consumer = require('./src/consumer')
  , producer = require('./src/producer')
  , uploader = require('./src/uploader')
  , uuid = require('node-uuid');


var connection = amqp.createConnection(config.amqp.credentials);

connection.on('ready', function() {
	producer.init(connection, config.amqp.producer);
	uploader.init(config.upload.cloudinary);
	consumer.start(connection, config.amqp.consumer);
	consumer.on('msg', function(msg) {
		if (!msg.url) {
			console.log('malformed message, no url property: ' + JSON.stringify(msg));
			return;
		}
		webshot(msg.url, config.webshot, function(err, stream) {
			if (err) { console.log(err); }
			var filename = msg.filename || uuid.v4();
			uploader.handleStream(stream, filename, producer.publish.bind(producer));
		});
	});
});

connection.on('error', function(error) {
	console.log(error);
	process.exit(1);
});