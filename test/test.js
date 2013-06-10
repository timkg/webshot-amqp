var config = require('../config')
  , amqp = require('amqp')
  , consumer = require('../src/consumer');

var connection = amqp.createConnection(config.amqp.credentials);

connection.on('ready', function() {
	var exc = connection.exchange('screenshot.exchange', {}, function(exchange) {
		console.log('Exchange ' + exchange.name + ' ready');

		// listen on response queue
		var resQ = connection.queue(config.amqp.producer.queueName, function(queue) {
			queue.bind(exchange, config.amqp.producer.routingKey);
			queue.on('queueBindOk', function() {
				queue.subscribe(function(msg) {
					console.log(JSON.stringify(msg));
					process.exit(0);
				})
			});
		})

		// send request
		var reqQ = connection.queue(config.amqp.consumer.queueName, function(queue) {
			queue.bind(exchange, config.amqp.consumer.routingKey);
			queue.on('queueBindOk', function() {
				exchange.publish(config.amqp.consumer.routingKey, {url: 'http://www.google.com'}, {
					contentType: 'text/plain'
				});
			});
		})
	});
	exc.on('error', function(err) {
		console.error(err);
	});
});