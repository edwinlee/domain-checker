var router = require('./router');

var http = require('http');

http.createServer( (request, response) => {
  router.home(request, response);
  router.domain(request, response);
}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');