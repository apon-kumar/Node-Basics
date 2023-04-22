var http = require('http');
var module1 = require('./module1');
var fs = require('fs');

function onRequest(request, response){
    response.writeHead(200, {'Content-Type' : 'text/html'});
    fs.readFile('./index.html', null, function(error, data){
        if(error){
            response.writeHead(404);
            response.write('File Not Found!');
        }
        else{
            response.write(data);
        }
        response.end();
    });
    // response.write(module1.test);
    // module1.show();
    
}
http.createServer(onRequest).listen(8000);