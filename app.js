var domain = require('./domain');

var names = process.argv.slice(2);

if(names.length < 1) {
	console.log("Please enter at least one domain name.");
	return;
}

names.forEach(domain.check);