webshot-amqp
=============

A message-oriented screenshot server using AMQP for communication, webshot for the screenshots, and Cloudinary for hosting.

Pull-requests, issues and feedback welcome.

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

To-do
=====
- Proper unit tests
- Easier and more configuration

License
===============

(The MIT License)

Copyright (c) 2013 Tim Theodor Koch-Grünberg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.