var Domain = require("./domain.js");


var domainStatus = new Domain("google.com");

/**
* When the JSON body is fully recieved the 
* the "end" event is triggered and the full body
* is given to the handler or callback
**/
domainStatus.on("end", console.dir);

/**
* If a parsing, network or HTTP error occurs an
* error object is passed in to the handler or callback
**/
domainStatus.on("error", console.error);