webshot-amqp
=============

A message-oriented screenshot server using AMQP for communication, webshot for the screenshots, and Cloudinary for hosting.

Installation
============
```
npm install webshot-amqp
```

Dependencies
============
- An AMQP server, for example RabbitMQ
- phantomJS installed locally
- A cloudinary account

Usage
=====

Configure the server in config.js, then:
```
node app.js
```

The server now listens for requests on the exchange and queue defined in config.js. When a message comes in, the server uses webshot to take a screenshot of the desired website, and streams the image to Cloudinary's CDN. When done, it publishes a message on the exchange and queue defined in config.js with relevant metadata, including the public URL under which the image can be found.

Consider using the module [webshot-amqp-client](https://github.com/timkg/webshot-amqp-client) to place requests and listen for arriving screenshots.