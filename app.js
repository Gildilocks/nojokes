var static = require('node-static');
 
// 
// Create a node-static server instance to serve the './public' folder 
// 
var fileServer = new static.Server('./public');
var port = process.env.PORT || 3000;
 
require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response, function (err, result) {
            if (err) { // There was an error serving the file 
                console.error("Error serving " + request.url + " - " + err.message);
 
                // Respond to the client 
                response.writeHead(err.status, err.headers);
                response.end();
            }
        });
    }).resume();
}).listen(port);