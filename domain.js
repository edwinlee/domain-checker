function check(domain) {

	var http = require("http");
	var querystring = require("querystring");

	var data = querystring.stringify({
			cmd : "GET_DN_AVAILABILITY",
      domainName : domain,
      userName : "edwinlee",
      password : "testing",
      getMode : "DNS_AND_WHOIS",
      outputFormat : "JSON"
	});

	var options = {
		host: "whoisxmlapi.com",
		path: "/whoisserver/WhoisService?" + data
	};

	var req = http.request(options, (res) => {
		var body = "";
		res.on('data', (chunk) => {
			body += chunk;
		});
		res.on('end', () => {
			if(res.statusCode == 200) {
				try {
					var status = JSON.parse(body);	
					console.log(domain + " is " + status.DomainInfo.domainAvailability.toLowerCase() + ".");
				} catch(error) {
					console.log(error);
				}
			} else {
				console.log(res.statusCode);	
			}	
		})
	});

	req.on('error', (e) => {
		console.log(`problem with request: ${e.message}`);
	});

	req.end();
}

module.exports.check = check;


