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

var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
  tableName: 'users'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/thoughts', function(req, res, next){
  var thoughts = knex.select('*').from('thoughts').asCallback(function(err, data){
    var thoughts_list = [];
    for(i=0; i < data.length; i++){
      thoughts_list.push({message: data[i].message, id: data[i].id })
    }
    res.send({
      title: "Thought List",
      thoughts: thoughts_list
    });
  })
});

router.post('/thoughts/add', function(req, res, next){
  var input = JSON.parse(JSON.stringify(req.body));
  var new_thought = knex('thoughts').insert({message: input.message}).asCallback(function(err, data){
    var query = knex.select('*').from('thoughts').where('id', data[0]).asCallback(function(err, data){      res.send({
        id: data[0].id,
        message: data[0].message
      });
    })
  })
})

router.delete('/thoughts/delete/:id', function(req, res, next){
  var input = req.params.id
  var new_thought = knex('thoughts').where('id', input).del().asCallback(function(err, data){
    res.send({
      thought_id: input,
      removed: true
    });
  });
});

module.exports = router;
