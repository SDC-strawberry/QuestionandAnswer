const express = require('express');
const router = express.Router();
const myPostGreSQL = require('../../SQLdatabase/postGreSQL.js');
//const QA_RouteConfig = require('../../config.js');



// GET QUESTION LIST for a given product_id
router.get('/questions', (req, res) => {
  console.log('entered the /questions route: ');

  // product_id	integer	Specifies the product for which to retrieve questions.
  // page	integer	Selects the page of results to return. Default 1.
  // count	integer	Specifies how many results per page to return. Default 5.

  // "SELECT * FROM "Questions" LIMIT 5"

  // these are default values for now
  let obj_param = {
    product_id: 1,
    page: (req.query.page) ? req.query.page : 1,
    count: (req.query.count) ? req.query.count : 5
  }

  console.log(`page: ${obj_param.page}, count: ${obj_param.count}`);

  myPostGreSQL.getQuestions(obj_param, (err, result) => {
    if (err) {
      console.log('error getting question: ', err);
    }
    //console.log('GET question success ', result)

    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(result, null, 4));

  });

});

// GET ANSWER LIST FOR GIVEN QUESTION
router.get('/questions/:question_id/answers', (req, res) => {
 // console.log('returns answers for a given question', req.params.question_id);

 console.log(`page: ${req.query.page}, count: ${req.query.count}`);

  // these are default values for now
  let obj_param = {
    question_id: 1,
    page: (req.query.page) ? req.query.page : 1,
    count: (req.query.count) ? req.query.count : 5
  }

  myPostGreSQL.getAnswers(obj_param, (err, result) => {
    if (err) {
      console.log('Error getting answers: ', err);
    }
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(result, null, 4));
  });

});

// ADD ANSWER FOR A GIVEN QUESTION
router.post('/questions/:question_id/answers', (req, res) => {
  // construct object
  const builtPath = API_PATH + `questions/${req.params.question_id}/answers`;

  // NOTE TO SELF UNCOMMENT THIS and ADD Product_ID to the initial axios request.
  const answerToBePosted = {
    body: req.body.answerbody,
    name: req.body.nickname,
    email: req.body.email,
    photos : req.body.photos,
  };

  myPostGreSQL.addAnswer(answerToBePosted, function(err, result) {
    if (err) {
      console.log('Error reporting question: ', err);
    }
    console.log('Report Question Success: ', result)
    res.send(result);
  });

});

// ADD QUESTION
router.post('/questions', (req, res) => {

  const newQuestion = {
    body: req.body.question,
    name: req.body.nickname,
    email: req.body.email,
    product_id: req.body.product_id,
  };

  myPostGreSQL.addQuestion(newQuestion, function(err, result) {
    if (err) {
      console.log('Error reporting question: ', err);
    }
    console.log('Report Question Success: ', result)
    res.send(result);
  });

});


// REPORT QUESTIONS
// Mark Question as Helpful
router.put('/questions/:question_id/helpful', (req, res) => {

  myPostGreSQL.helpfulQuestion(req.params.question_id, function(err, result) {
    if (err) {
      console.log('Error marking question as helpful:', err);
    }
    console.log('Helpful Question successful: ', result)
    res.send(result);
  });
});

// Report Question
router.put('/questions/:question_id/report', (req, res) => {

  myPostGreSQL.reportQuestion(req.params.question_id, function(err, result) {
    if (err) {
      console.log('Error reporting question: ', err);
    }
    console.log('Report Question Success: ', result)
    res.send(result);
  });

});

// REPORT ANSWERS
// Mark Answer as Helpful
router.put('/answers/:answer_id/helpful', (req, res) => {
 
  myPostGreSQL.helpfulAnswer(req.params.answer_id, function(err, result) {
    if (err) {
      console.log('Error marking answer as helpful: ', err);
    }
    console.log('Success marking answer as helpful: ', result);
    res.send(result);
  });

});

// Report Answer
router.put('/answers/:answer_id/report', (req, res) => {

  myPostGreSQL.reportAnswer(req.params.answer_id, function(err, result) {
    if (err) {
      console.log('error reporting answer ', err);
    }
    console.log('success reporting answer: ', result);
    res.send(result);
  });

});

module.exports = router;