const express = require("express");
const myPostGreSQL = require('./SQLdatabase/postGreSQL.js');
//const myNoSQLdb = require("./NoSQLdatabase/mongoindex.js");
const app = express();
const PORT = 3000;

//perhaps process.env.port || 6379 is better practice?
const REDIS_PORT = 6379;  

const redis = require('redis');

// function redis_Middleware(req, res, next) {

// }

// const redisClient = redis.createClient(REDIS_PORT);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/../client/dist"));

app.get('/questions', (req, res) => {

  // product_id	integer	Specifies the product for which to retrieve questions.
  // page	integer	Selects the page of results to return. Default 1.
  // count	integer	Specifies how many results per page to return. Default 5.

  // "SELECT * FROM "Questions" LIMIT 5"

  let obj_param = {
    product_id: req.params.product_id,
    page: req.params.page,
    count: req.params.count,
  }

  myPostGreSQL.getQuestions(obj_param, (err, result) => {
    if (err) {
      console.log('error getting question: ', err);
    }
    console.log('GET question success ', result)
    res.send(result);
  });

});


app.get('/', (req, res) => {

  // building the question obj
  var q_obj = {};
  q_obj.question_id = 212824;
  q_obj.question_body = "YACC New Question?";
  q_obj.question_date = "2021-06-16T00:00:00.000Z";
  q_obj.asker_name = "curiously";
  q_obj.question_helpfulness = 7;
  q_obj.reported = false;
  q_obj.product_id = 22122;

  // // postGresSQL call
  myPostGreSQL.addQuestion(q_obj, function(err, result) {
    if (err) {
      console.log('error writing to database: ', err);
    }
    console.log('this was the result of adding to the SQL db question: ', result)
  });

  //building the answer obj

  var a_obj = {};
  a_obj.answer_id = 1991258;
  a_obj.body = "Example answer to be posted";
  a_obj.answer_date = "2021-06-08T00:00:00.000Z";
  a_obj.answerer_name =  "Question person";
  a_obj.helpfulness = 28;
  a_obj.photos = 1991258;
  a_obj.question_id = 212824;


  // postGRESQL call
  myPostGreSQL.addAnswer(a_obj, function(err, result) {
    if (err) {
      console.log('error writing to database: ', err);
    }
    console.log('this was the result of adding to the SQL db answer: ', result)
  });





  res.send('question route /');
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});