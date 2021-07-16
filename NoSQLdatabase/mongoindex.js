const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/questionandanswers');

let questionSchema = mongoose.Schema({
  question_id: Number,
  question_body: String,
  question_date: Date,
  asker_name: String,
  question_helpfulness: Number,
  reported: Boolean,
  answers: {},
});

let answerSchema = mongoose.Schema({
  id: Number,
  body: String,
  date: Date,
  answerer_name: String,
  helpfulness: Number,
  photos: [String],
});

let questionModel = mongoose.model('questionModel', questionSchema);
let answerModel = mongoose.model('answerModel', answerSchema);

let queryQuestions = (findQueryCallback) => {
  //NOTE: FROM THE MONGOOSE DOCS, MONGOOSE QUERIES ARE NOT PROMISES BUT HAVE A .THEN AS A CONVENIENCE
  //the find query is called not on any document but rather the model.
  return questionModel.find(findQueryCallback).pretty();
}


let queryAnswers = (findQueryCallback) => {
  //NOTE: FROM THE MONGOOSE DOCS, MONGOOSE QUERIES ARE NOT PROMISES BUT HAVE A .THEN AS A CONVENIENCE
  //the find query is called not on any document but rather the model.
  return answerModel.find(findQueryCallback).pretty();
}


let addQuestion = (db_save_object, callback) => {
  console.log('does it call the save function?');

  // extract the data from the input query
  const question = new questionModel({
    question_id: db_save_object.question_id,
    question_body: db_save_object.question_body,
    question_date: db_save_object.question_date,
    asker_name: db_save_object.asker_name,
    question_helpfulness: db_save_object.question_helpfulness,
    reported: db_save_object.reported,
    answers: db_save_object.answers,
  });

  // save to the mongoDB
  question.save(function (error, success) {
    if (error) {
      console.log('attempts to save created an error', error);
      callback(error, null);
    } else {
      console.log('successfully saved to mongo DB: ', success);
      callback(null, success);
    }
  });
}


let addAnswer = (db_save_object, callback) => {
  console.log('does it call the save function?');

  // extract the data from the input query
  const answer = new answerModel({
    id: db_save_object.id,
    body: db_save_object.body,
    date: db_save_object.date,
    answerer_name: db_save_object.answerer_name,
    helpfulness: db_save_object.helpfulness,
    photos: db_save_object.photos,
  });

  // // save to the mongoDB
  answer.save(function (error, success) {
    if (error) {
      console.log('attempts to save created an error', error);
      callback(error, null);
    } else {
      console.log('successfully saved to mongo DB: ', success);
      callback(null, success);
    }
  });
}




module.exports.addQuestion = addQuestion;
module.exports.addAnswer = addAnswer;
module.exports.queryQuestions = queryQuestions;
module.exports.queryAnswers = queryAnswers;

