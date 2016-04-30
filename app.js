var http = require("http");
var querystring = require("querystring");

if(!process.argv[2]) {
	console.log("Please enter a domain name.");
	return;
}

var data = querystring.stringify({
		cmd : "GET_DN_AVAILABILITY",
                domainName : process.argv[2],
                userName : "edwinlee",
                password : "testing",
                outputFormat : "JSON"
});

var options = {
	host: "whoisxmlapi.com",
	path: "/whoisserver/WhoisService?" + data
};

var req = http.request(options, function(res) {
	var body = "";
	res.on('data', function(chunk) {
		body += chunk;
	});
	res.on('end', function() {
		if(res.statusCode == 200) {
			try {
				var status = JSON.parse(body);	
				console.log("The domain is " + status.DomainInfo.domainAvailability.toLowerCase() + ".");
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


