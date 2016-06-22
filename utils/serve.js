var express = require('express');
var app = express();
var path = require('path');

app.use('/src', express.static(path.resolve(__dirname, '../src')));

app.get('/', function(req,res) {
  res.sendFile(path.resolve(__dirname,'../index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
