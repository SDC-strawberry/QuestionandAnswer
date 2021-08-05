const express = require("express");
//var compression = require('compression')
const myPostGreSQL = require('./SQLdatabase/postGreSQL.js');
const QAroutes = require('./server/routes/QA_routes.js');
//const myNoSQLdb = require("./NoSQLdatabase/mongoindex.js");
const app = express();
const PORT = 3000;
const cors = require('cors');
var path = require('path');



//perhaps process.env.port || 6379 is better practice?
const REDIS_PORT = 6379;  

const redis = require('redis');

// function redis_Middleware(req, res, next) {

// }

// const redisClient = redis.createClient(REDIS_PORT);

// import routes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));
app.use(express.static('public'));

//app.use(compression());
// import the routes
app.use('/qa', QAroutes);


//this is the testbed for adding & reporting

app.get('/', (req, res) => {

  // building the question obj
  // var q_obj = {};
  // q_obj.question_id = 212824;
  // q_obj.question_body = "YACC New Question?";
  // q_obj.question_date = "2021-06-16T00:00:00.000Z";
  // q_obj.product_id = 22122;

  // // // postGresSQL call
  // myPostGreSQL.addQuestion(q_obj, function(err, result) {
  //   if (err) {
  //     console.log('error writing to database: ', err);
  //   }
  //   console.log('this was the result of adding to the SQL db question: ', result)
  // });

  //building the answer obj

  // var a_obj = {};
  // a_obj.answer_id = 1991258;
  // a_obj.body = "Example answer to be posted";
  // a_obj.answer_date = "2021-06-08T00:00:00.000Z";
  // a_obj.answerer_name =  "Question person";
  // a_obj.answerer_email = "k6test@ktester.com";
  // a_obj.helpfulness = 28;
  // a_obj.photos = 1991258;
  // a_obj.question_id = 212824;


  // // postGRESQL call
  // myPostGreSQL.addAnswer(a_obj, function(err, result) {
  //   if (err) {
  //     console.log('error writing to database: ', err);
  //   }
  //   console.log('this was the result of adding to the SQL db answer: ', result)
  // });

//   var options = {
//     root: path.join(__dirname)
// };
  
//   var fileName = 'loaderio-7b8ed8a5aa3e41ba7dea1cf3d1854ded.txt';
//   res.sendFile(fileName, options, function (err) {
//       if (err) {
//           next(err);
//       } else {
//           console.log('Sent:', fileName);
//       }
//   });





  res.send(__dirname + "/../client/dist");
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});