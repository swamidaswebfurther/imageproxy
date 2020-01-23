var Url = require('url');
var Path = require('path');
var http = require('http');
var https = require('https');

http.createServer(onRequest).listen(3000);

function onRequest(request, response) {

	var imgurl = Url.parse(request.url, true);
	var imageUrl = imgurl.query.url;
	parts = Url.parse(imageUrl);

	var httpHeaders = {
	'accept': '*/*',
	'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
        'Accept-Encoding': 'none',
        'Accept-Language': 'en-US,en;q=0.8',
        'Connection': 'keep-alive'
	};	

	var options = {

	hostname: parts.hostname,

	port: 80,

	path: parts.path,

	method: 'GET',

	headers: httpHeaders

	};

	var proxy = http.request(options, function (res) {

	response.writeHead(res.statusCode, res.headers)

		res.pipe(response, {

		end: true

		});

	});

	request.pipe(proxy, {

	end: true

	});

}
