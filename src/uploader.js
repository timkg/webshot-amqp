/*
 * Change this file in case you want to change hosting/CDN provider.
 */

var cloudinary = require('cloudinary');

exports.init = function(config) {
	cloudinary.config('cloud_name', config.cloudName);
	cloudinary.config('api_key', config.apiKey);
	cloudinary.config('api_secret', config.apiSecret);
};

exports.handleStream = function(webshotStream, filename, callback) {
	var uploadStream = cloudinary.uploader.upload_stream(callback, {public_id: filename});
	webshotStream.on('data', uploadStream.write);
	webshotStream.on('end', uploadStream.end);
};