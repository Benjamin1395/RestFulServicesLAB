const http = require('http'); //Constant to use http for create our server

const server = http.createServer((req,res) => //Request,Respond at the moment of the creation of the server
{ 
    if(req.url =='/'){
        res.write('Hi everyone');
        res.end();
    }

});

server.listen(3000); //Port where we're going to login to the server

console.log('Listening on port 3000........');