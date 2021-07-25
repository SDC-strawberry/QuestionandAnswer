const express = require('express');
const router = express.Router();
const myPostGreSQL = require('../../SQLdatabase/postGreSQL.js');
//const QA_RouteConfig = require('../../config.js');



// GET QUESTION LIST for a given product_id
router.get('/questions', (req, res) => {
  //console.log('/questions GET route called: ');

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

  
  //console.log(`page: ${obj_param.page}, count: ${obj_param.count}`);

  myPostGreSQL.getQuestions(obj_param, (err, result) => {
    if (err) {
      console.log('error getting question: ');
    }
    //console.log('GET question success ', result)

    res.header("Content-Type",'application/json');
    res.status(200).send(JSON.stringify(result, null, 4));

  });

});

// GET ANSWER LIST FOR GIVEN QUESTION
router.get('/questions/:question_id/answers', (req, res) => {
 //console.log('/questions/:question_id/answers GET route called: ');
 // console.log('returns answers for a given question', req.params.question_id);

 //console.log(`page: ${req.query.page}, count: ${req.query.count}`);

  // these are default values for now
  let obj_param = {
    question_id: req.params.question_id,
    page: (req.query.page) ? req.query.page : 1,
    count: (req.query.count) ? req.query.count : 5
  }

  myPostGreSQL.getAnswers(obj_param, (err, result) => {
    if (err) {
      console.log('Error getting answers: ', err);
    }
    res.header("Content-Type",'application/json');
    res.status(200).send(JSON.stringify(result, null, 4));
  });

});

// ADD ANSWER FOR A GIVEN QUESTION
router.post('/questions/:question_id/answers', (req, res) => {

  //console.log('/questions/:question_id/answers POST route called: ');
  // construct object
  // const builtPath = API_PATH + `questions/${req.params.question_id}/answers`;

  // NOTE TO SELF UNCOMMENT THIS and ADD Product_ID to the initial axios request.
  const answerToBePosted = {
    question_id: req.body.question_id,
    body: req.body.answer_body,
    date_written: req.body.date_written,
    answerer_name: req.body.answerer_name,
    answerer_email: req.body.answerer_email,
  };

  myPostGreSQL.addAnswer(answerToBePosted, function(err, result) {
    if (err) {
      console.log('Error adding question: ', err);
    }
    //console.log('Report Question Success: ', result)
    res.status(201).send(result);
  });

});

// ADD QUESTION
router.post('/questions', (req, res) => {

  //console.log('/questions POST route called: ');

  const newQuestion = {
    product_id: req.body.product_id,
    body: req.body.question_body,
    date_written: req.body.date_written,
    asker_name: req.body.asker_name,
    asker_email: req.body.asker_email,
  };

  myPostGreSQL.addQuestion(newQuestion, function(err, result) {
    if (err) {
      console.log('Error adding question: ', err);
    }
    //console.log('Report Question Success: ', result)
    res.status(201).send(result);
  });

});


// REPORT QUESTIONS
// Mark Question as Helpful
router.put('/questions/:question_id/helpful', (req, res) => {

  //console.log('/questions/:question_id/helpful PUT route called: ');

  myPostGreSQL.helpfulQuestion(req.params.question_id, function(err, result) {
    if (err) {
      console.log('Error marking question as helpful:', err);
    }
    //console.log('Helpful Question successful: ', result)
    res.status(204).send(result);
  });
});

// Report Question
router.put('/questions/:question_id/report', (req, res) => {
  //console.log('/questions/:question_id/report PUT route called: ');

  myPostGreSQL.reportQuestion(req.params.question_id, function(err, result) {
    if (err) {
      console.log('Error reporting question: ', err);
    }
    //console.log('Report Question Success: ', result)
    res.status(204).send(result);
  });

});

// REPORT ANSWERS
// Mark Answer as Helpful
router.put('/answers/:answer_id/helpful', (req, res) => {

  //console.log('/answers/:answer_id/helpful PUT route called: ');
 
  myPostGreSQL.helpfulAnswer(req.params.answer_id, function(err, result) {
    if (err) {
      console.log('Error marking answer as helpful: ', err);
    }
  //  console.log('Success marking answer as helpful: ', result);
    res.status(204).send(result);
  });

});

// Report Answer
router.put('/answers/:answer_id/report', (req, res) => {

  //console.log('/answers/:answer_id/report PUT route called: ');

  myPostGreSQL.reportAnswer(req.params.answer_id, function(err, result) {
    if (err) {
      console.log('error reporting answer ', err);
    }
  //-  console.log('success reporting answer: ', result);
    res.status(204).send(result);
  });

});

module.exports = router;