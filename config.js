module.exports = {
	amqp: {
		credentials: {
			host: "localhost",
			port: 5672,
			username: "guest",
			password: "guest",
			vhost: "/"
		},
		consumer: {
			exchangeName: "screenshot.exchange",
			queueName: "screenshot.request",
			routingKey: "request"
		},
		producer: {
			exchangeName: "screenshot.exchange",
			queueName: "screenshot.response",
			routingKey: "response"
		}
	},
	webshot: {
		screenSize: {
			width: 800
			, height: 600
		}
	},

	upload: {
		cloudinary: {
			cloudName: "cloudName", 
			apiKey: "apiKey",
			apiSecret: "apiSecret"
		}
		// extend with credentials in case you change CDN provider
	}
};