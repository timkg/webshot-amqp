var EventEmitter = require( "events" ).EventEmitter
  , consumer = Object.create(new EventEmitter());

consumer.init = function(connection, config) {
	var exchange, queue;

	exchange = connection.exchange(config.exchangeName, {/* options */}, onExchangeEstablished);
	exchange.on('error', function(err) {
		console.log(err);
	});

	function onExchangeEstablished(exchange) {
		queue = connection.queue(config.queueName, {/* options */}, onQueueEstablished);
		queue.on('error', function(err) {
			console.log(err);
		});
	}

	function onQueueEstablished(queue) {
		queue.bind(exchange, config.routingKey);
		queue.on('queueBindOk', function() {
			queue.subscribe(onMessageReceived);
		});
	}

	function onMessageReceived(message, headers, deliveryInfo) {
		consumer.emit('msg', message);	
	}
};

module.exports = consumer;