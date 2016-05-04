var EventEmitter = require("events").EventEmitter;
var http = require("http");
var util = require("util");
var querystring = require("querystring");

function Domain(name) {

	EventEmitter.call(this);

	domainEmitter = this;

	var data = querystring.stringify({
			cmd : "GET_DN_AVAILABILITY",
      domainName : name,
      userName : "edwinlee",
      password : "testing",
      getMode : "DNS_AND_WHOIS",
      outputFormat : "JSON"
	});

	var req = http.get("http://whoisxmlapi.com/whoisserver/WhoisService?" + data, (res) => {
		var body = "";

		 if (res.statusCode !== 200) {
          request.abort();
          //Status Code Error
          domainEmitter.emit("error", new Error("There was an error getting the domain for " + name + ". (" + http.STATUS_CODES[res.statusCode] + ")"));
      }
		
		res.on('data', (chunk) => {
			body += chunk;
			domainEmitter.emit("data", chunk);
		});

		res.on('end', () => {
			if(res.statusCode == 200) {
				try {
					var status = JSON.parse(body);	
						domainEmitter.emit('end', status.DomainInfo.domainAvailability.toLowerCase());
				} catch(error) {
						domainEmitter.emit('error', error);
				}
			}
		}).on("error", (error) => {
			domainEmitter.emit("error", error);
		});

	});

}

util.inherits(Domain, EventEmitter);

module.exports = Domain;


