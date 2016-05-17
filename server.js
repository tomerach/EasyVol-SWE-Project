
var http = require('http')
    , url  = require('url')
    , fs   = require('fs');
var neededstats = [];
//var p = __dirname + '/' + req.params.filepath; //there is some error here you haven't defined req yet
http.createServer(function (req,res) {
    if(req.url=='/index.html' || req.url=='/') {
        fs.readFile('./index.html',function(err,data){
            res.end(data);
        });
    } else {
        var url_parts = url.parse(req.url);
        //console.log(url_parts);
        console.log(url_parts.pathname);
        var p = '.' + url_parts.pathname;
        //fs.createReadStream(p).pipe(res);

        fs.stat(p, function (err, stats) {
            if (err) {
                //throw err;
            }
            //neededstats.push(stats.mtime);
            //neededstats.push(stats.size);
            //res.sendFile(p);
        });

        fs.readFile(p,function(err,data){
            if(err) {
                fs.createReadStream(p).pipe(res);
                res.end();
            }
            else
                res.end(data);
        });

    }

    }).listen(80,'0.0.0.0');
console.log('Server running.');





/*
var connect = require('connect');
var http = require('http');
var fs = require('fs');

var app = connect();

function handleRequest(request, response, next) {
    response.writeHead(200, {"Content-Type" : "text/html"});
    fs.createReadStream(request.url).pipe(response);

}

app.use(handleRequest);

http.createServer(app).listen(80);
console.log("Server is running");
    */