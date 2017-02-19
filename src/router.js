var Domain = require('./domain');
var renderer = require('./renderer');
var querystring = require("querystring");

var commonHeaders = {'Content-Type': 'text/html'};

function home(request, response) {
	
	if (request.url === "/") {

		if(request.method.toLowerCase() === "get") {
			response.writeHead(200, commonHeaders);
			renderer.view("header", {}, response);
			renderer.view("search", {}, response);
			renderer.view("footer", {}, response);
			response.end();
		} else {
			// redirect to username
			request.on("data", function(postBody) {
				//extract domain
				var query = querystring.parse(postBody.toString());
				response.writeHead(303, {"Location": "/" + query.domain});
				response.end();
			});
		}

		
		
	}
	
}

function domain(request, response) {

	var domain = request.url.replace("/", "");

	if (domain.length > 0) {
		response.writeHead(200, commonHeaders);
		renderer.view("header", {}, response);

		var domainStatus = new Domain(domain);

		domainStatus.on("end", function(status) {
			renderer.view("domain", {domain: domain, status: status}, response);
			renderer.view("search", {}, response);
			renderer.view("footer", {}, response);
			response.end();
		});


		domainStatus.on("error", function(error) {
			renderer.view("error", {errorMessage: error.message}, response);
			renderer.view("search", {}, response);
			renderer.view("footer", {}, response);
			response.end();
		});
		
	}
}

module.exports.home = home;
module.exports.domain = domain;