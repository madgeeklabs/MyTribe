var express  = require('express');

var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

//...
app.configure(function() {
    app.use(allowCrossDomain);
});


app.get("/", function(req, res){
    console.log(req);
    console.log('get!!!!');
     var body = 'Hello World';
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', body.length);
    res.end(body);
    
});
app.post("/", function(req, res){
    console.log(req);
    console.log(res);
    console.log('get!!!!');
     var body = 'Hello World';
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', body.length);
    res.end(body);
    
});

app.listen(5000);
