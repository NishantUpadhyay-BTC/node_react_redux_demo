require('babel-register')
var express = require('express');
var router = express.Router();

var knex = require('knex')({
  client: 'mysql',
  connection: {
      host     : 'localhost',
      user     : 'root',
      password : 'root',
      database : 'nodejs',
      charset  : 'utf8'
  }
});

router.post('/add', function(req, res, next){
  var input = JSON.parse(JSON.stringify(req.body));
  console.log(" input *********** " + input)
  res.send({message: "success"});
})
