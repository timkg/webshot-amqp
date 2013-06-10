var producer = {
	connection: undefined,
	config: undefined
};

producer.init = function(conn, conf) {
	producer.connection = conn;
	producer.config = conf;
};

producer.publish = function(data) {
	exchange = producer.connection.exchange(producer.config.exchangeName, {/* options */}, onExchangeEstablished);
	exchange.on('error', function(err) {
		console.log(err);
	});

	function onExchangeEstablished(exchange) {
		var q = producer.connection.queue(producer.config.queueName, function(queue) {
			queue.bind(exchange, producer.config.routingKey);
			queue.on('queueBindOk', function() {
				exchange.publish(producer.config.routingKey, data);
			});
		})
	}
};

module.exports = producer;