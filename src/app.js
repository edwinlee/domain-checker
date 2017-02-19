var router = require('./router');

var http = require('http');

http.createServer( (request, response) => {
  router.home(request, response);
  router.domain(request, response);
}).listen(3000);

console.log('Server running at http://127.0.0.1:3000/');