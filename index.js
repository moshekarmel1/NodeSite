// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/projects', function(req, res){
    res.sendFile(__dirname + '/public/projects.html');
});

app.get('/career', function(req, res){
    res.sendFile(__dirname + '/public/career.html');
});

app.get('/skills', function(req, res){
    res.sendFile(__dirname + '/public/skills.html');
});

app.get('/projects', function(req, res){
    res.sendFile(__dirname + '/public/projects.html');
});
