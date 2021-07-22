const {Client } = require('pg')

const client = new Client({
  user: 'Tom1',
  host: 'localhost',
  database: 'questionandanswer',
  password: 'password',
  port: 5432,
})

client.connect()



// **** SELF NOTES 1 INDEXING ****//
// Because we need all the answers for a particular question: we index answers by question_id
// CREATE INDEX idx_Answers_question_id ON "Answers" (question_id);

// Because we need all the photos for a particular answer: we index photos by answer_id
// CREATE INDEX idx_photos_answer_id ON photos (answer_id);

// Because we need all the questions for a particular product_id: we index questions by product_id
// CREATE INDEX idx_Questions_product_id ON "Questions" (product_id);

// **** SELF NOTES 2 PAGINATION ****//
// pagination done!  
// there were several pagination schemes or patterns available for use.
// the simplest one, limit offset gets us off the ground quickly but has disadvantages for
// lack of consistency when a user may post a new record into the database.  Moreover, for large
// datasets the "shifting" will greatly increase access times, 754ms for 5 x10^6 offset

// For this reason I chose to use Key-set pagination, which requires an ordering.
// This ordering is a natural result of the use of primary keys, and allows us scalable indexing
// I used this command
// CREATE INDEX n_idx_Questions on "Questions" USING btree (id);
// btree(id) or rather indexing by btree allows us the inequality operator

// with that in mind, pagination can now proceed as follows:
// SELECT * from "Questions" WHERE id > 5 ORDER BY id ASC LIMIT 5;
// this returns the page of results for page 2, count = 5

// **** SELF NOTES 3 ***** 
// building the complex query of joins in such a manner that we can limit the time it takes
// example query used for multi table build, removed pagination of q results

// SELECT "Questions".product_id as question_pid, "Questions".id as question_pk, "Questions".id as question_id, "Questions".body as question_body, "Answers".id as answer_id, "Answers".body as answer_body, photos.url as photo_url from "Questions" 
// LEFT OUTER JOIN "Answers" on "Questions".id = "Answers".question_id 
// LEFT OUTER JOIN photos on "Answers".id = photos.answer_id
// WHERE ("Questions".product_id = 6) ORDER BY "Questions".id





const buildQuestionObj = function(rowElement) {

  let new_question_obj = {
    question_id : rowElement.question_id,
    question_body : rowElement.question_body,
    question_date : rowElement.question_date,
    asker_name : rowElement.asker_name,
    question_helpfulness : rowElement.question_helpfulness,
    reported : rowElement.reported,
    answers : {},
  }

  return new_question_obj;
}

const buildAnswerObj = function(rowElement) {

  let new_answer_obj = {
    id : rowElement.answer_id,
    body : rowElement.answer_body,
    date : rowElement.answer_date,
    answerer_name : rowElement.answerer_name, 
    helpfulness : rowElement.answer_helpfulness,
    photos: [],
  }

  return new_answer_obj;
  
}

const buildPhotoObj = function(rowElement) {
  let built_obj = {
    id: rowElement.photos_id,
    url: rowElement.photos_url,
  }
  return built_obj;
}



// *********  GET QUESTIONS AND ANSWERS ********* 

// database interaction to add a question into the database
const getQuestions = function(obj_param, callback) {

  let { page, count, product_id } = obj_param;

  
  //var queryStr = `SELECT * FROM "Questions" WHERE product_id = ${product_id} LIMIT ${count}`;

  // first limit by page
  // next we join by the answers;

  //var queryStr = `SELECT * from "Questions" `;
  // var queryStr = `SELECT "Questions".id as question_id, "Questions".body as question_body, "Answers".body as answer_body, photos.url as photo_url from "Questions"`;
  //   queryStr+= `LEFT OUTER JOIN "Answers" on "Questions".id = "Answers".question_id `;
  //   queryStr+= `LEFT OUTER JOIN photos on "Answers".id = photos.answer_id `;
  //   queryStr+= `WHERE ("Questions".id > 1 AND "Questions".id < 11) ORDER BY "Questions".id`;


  //for now im opting for getting all data in a single query
  var queryStr = `SELECT "Questions".id as question_pk, "Questions".id as question_id, "Questions".body as question_body, 
                  "Questions".date_written as question_date, "Questions".asker_name as asker_name, "Questions".helpful as question_helpfulness,
                  "Questions".reported as reported, "Answers".id as answer_id, "Answers".body as answer_body, 
                  "Answers".date_written as answer_date, "Answers".answerer_name as answerer_name, "Answers".helpful as answer_helpfulness,
                  photos.id as photos_id, photos.url as photos_url from "Questions" 
                  LEFT OUTER JOIN "Answers" on "Questions".id = "Answers".question_id 
                  LEFT OUTER JOIN photos on "Answers".id = photos.answer_id
                  WHERE ("Questions".product_id = 1) ORDER BY "Questions".id`;

    client.query(queryStr, (err, res) => {
      if (err) {
        callback(err, null);
      }
      console.log('get questions w massive query called');

      // these are flags
      var previousQuestion_id = res.rows[0].question_id;
      var previousAnswer_id = res.rows[0].answer_id;
      var resultsArray = [];

      let rowCounter = 0;

      while (rowCounter < (res.rows.length - 1) ) {
        //console.log(`outercurrentId : ${res.rows[rowCounter].question_id}`);

        previousQuestion_id = res.rows[rowCounter].question_id;

        let currentQuestionObj = buildQuestionObj(res.rows[rowCounter]);
        // if there is at least one answer for this question, build the obj
        if (res.rows[rowCounter].answer_id !== null) {
          let currentAnswerObj = buildAnswerObj(res.rows[rowCounter]);
          currentQuestionObj.answers[res.rows[rowCounter].answer_id] = currentAnswerObj;
  
            // if there is at least one photo url for this answer
            if (res.rows[rowCounter].photos_id !== null) {
              currentAnswerObj.photos.push(buildPhotoObj(res.rows[rowCounter]));
            }
        }


        while ((previousQuestion_id === res.rows[rowCounter].question_id) && (rowCounter < (res.rows.length - 1))) {
          
          let currentAnswerObj = buildAnswerObj(res.rows[rowCounter]);
          previousAnswer_id = res.rows[rowCounter].answer_id;
          
          // we can probably change this to not even call buildAnswerObj
          if (res.rows[rowCounter].answer_id) {
            currentQuestionObj.answers[res.rows[rowCounter].answer_id] = currentAnswerObj;
          }

            // there might be a first photo under this answer
            if (res.rows[rowCounter].photos_id !== null) {
              currentAnswerObj.photos.push(buildPhotoObj(res.rows[rowCounter]));
              //console.log(buildPhotoObj(res.rows[rowCounter]));
            }

          rowCounter++;

          while (previousAnswer_id === res.rows[rowCounter].answer_id) {
            if (res.rows[rowCounter].photos_id !== null) {
              currentAnswerObj.photos.push(buildPhotoObj(res.rows[rowCounter]));
              //console.log(buildPhotoObj(res.rows[rowCounter]));
            }
            rowCounter++;
          }
        }
        resultsArray.push(currentQuestionObj);
      }
      

      var finalObject = {
        product_id: product_id,
        results: resultsArray,
      }

      callback(null, finalObject);
    });

};


// database interaction to get all the answers for a particular question
const getAnswers = function(obj_param, callback) {

  let { page, count, question_id } = obj_param;


  // var queryStr = `SELECT * FROM "Answers" where question_id = ${question_id} LIMIT ${count}`;
  // get all the ids of the Answers and perform a query for each of the answers returned for their photos.

  // we have to get all the photos for the particular answer in question, map that over all the returned 
  // answer_ids.
  // var queryStr2 = `SELECT * FROM photos where answer_id = ${answer_id}`;
  // the results of that should be stuffed into a results array

  // this is one way to do it, without joins, uses 2 queries
  // var hypoQuery = `SELECT "Answers".id, photos.url FROM "Answers", photos WHERE question_id = 1 AND  photos.answer_id = "Answers".id`;

  // implementation choice to use multiple simple queries instead of a join, because
  // the nature of the join is not one to one which would create duplicative results.
  
  var queryStr = `SELECT "Answers".id as answer_id, "Answers".body as answer_body, "Answers".date_written as answer_date, "Answers".answerer_name as answerer_name, 
                  "Answers".helpful as answer_helpfulness, photos.id as photos_id, photos.url as photos_url
                  FROM "Answers"
                  LEFT OUTER JOIN photos on "Answers".id = photos.answer_id
                  WHERE ("Answers".question_id = ${question_id})`;


  client.query(queryStr, (err, res) => {
    if (err) {
      callback(err, null);
    }
    console.log('answer query GET');


     // these are flags
      var previousAnswer_id = res.rows[0].answer_id;
      var resultsArray = [];

      let rowCounter = 0;

      while (rowCounter < (res.rows.length - 1) ) {
        //console.log(`outercurrentId : ${res.rows[rowCounter].question_id}`);

        previousAnswer_id = res.rows[rowCounter].answer_id;

        let currentAnswerObj = buildAnswerObj(res.rows[rowCounter]);
        // if there is at least one answer for this question, build the obj
         
          // if there is at least one photo url for this answer
          if (res.rows[rowCounter].photos_id !== null) {
            currentAnswerObj.photos.push(buildPhotoObj(res.rows[rowCounter]));
          }

          rowCounter++;
          while (previousAnswer_id === res.rows[rowCounter].answer_id) {
            if (res.rows[rowCounter].photos_id !== null) {
              currentAnswerObj.photos.push(buildPhotoObj(res.rows[rowCounter]));
              //console.log(buildPhotoObj(res.rows[rowCounter]));
            }
            rowCounter++;
          }
        
        resultsArray.push(currentAnswerObj);
        
      }

      var finalObject = {
        question_id: question_id,
        page: page,
        count: count,
        results: resultsArray,
      }

      callback(null, finalObject);
  });


};


// const newQuestion = {
//   product_id: req.body.product_id,
//   body: req.body.question,
//   date_written: req.body.date_written,
//   asker_name: req.body.asker_name,
//   asker_email: req.body.asker_email,
// };

// *********  GET QUESTIONS AND ANSWERS ********* 

// database interaction to add a question into the database
// schema for reference: id,product_id,body,date_written,asker_name,asker_email,reported,helpful
const addQuestion = function(q_obj, callback) {

  var queryStr = `INSERT INTO "Questions" (product_id, body, date_written, asker_name, asker_email, reported, helpful)`;
  queryStr += ` VALUES ('${q_obj.product_id}', '${q_obj.body}', '${q_obj.date_written}', '${q_obj.asker_name}', '${q_obj.asker_email}', ${false}, '${0}')`;

  //console.log('this is the query string: ', queryStr);
  client.query(queryStr, (err, res) => {
    if (err) {
      callback(err, null);
    }
    console.log('successfully added record');
    callback(null, res);
  });

};



// const answerToBePosted = {
//   question_id: req.body.question_id,
//   body: req.body.answer_body,
//   date_written: req.body.date_written,
//   answerer_name: req.body.answerer_name,
//   answerer_email: req.body.answerer_email,
// };


// database interaction to add a question into the database
// schema: id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful
const addAnswer = function(a_obj, callback) {

  var queryStr = `INSERT INTO "Answers" (question_id, body, date_written, answerer_name, answerer_email, reported, helpful)`;
  queryStr += ` VALUES ('${a_obj.question_id}', '${a_obj.body}', '${a_obj.date_written}', '${a_obj.answerer_name}', '${a_obj.answerer_email}','${false}', '${0}')`;

  console.log('this is the query string: ', queryStr);
  client.query(queryStr, (err, res) => {
    if (err) {
      callback(err, null);
    }
    callback(null, res);
  });

};


/********** REPORT & HELPFUL QUESTIONS ********/
// database interaction to report question
const reportQuestion = function(question_id, callback) {

  var queryStr = `UPDATE "Questions" SET reported = true WHERE id = ${question_id}`;

  client.query(queryStr, (err, res) => {
    if (err) {
      callback(err, null);
    }
    callback(null, res);
  });

};

// database interaction to nominate question as helpful
const helpfulQuestion = function(question_id, callback) {
  var queryStr = `UPDATE "Questions" SET helpful = helpful + 1 WHERE id = ${question_id}`;

  client.query(queryStr, (err, res) => {
    if (err) {
      callback(err, null);
    }
    callback(null, res);
  });

};



/********** REPORT & HELPFUL ANSWERS ********/
// database interaction to report question
const reportAnswer = function(answer_id, callback) {

  var queryStr = `UPDATE "Answers" SET reported = true WHERE id = ${answer_id}`;

  client.query(queryStr, (err, res) => {
    if (err) {
      callback(err, null);
    }
    callback(null, res);
  });


};

// database interaction to nominate question as helpful
const helpfulAnswer = function(answer_id, callback) {
  var queryStr = `UPDATE "Answers" SET helpful = helpful + 1 WHERE id = ${answer_id}`;

  client.query(queryStr, (err, res) => {
    if (err) {
      callback(err, null);
    }
    callback(null, res);
  });
};



module.exports = {
  addQuestion,
  addAnswer,
  getQuestions,
  getAnswers,
  reportQuestion,
  helpfulQuestion,
  reportAnswer,
  helpfulAnswer,
};





// **** EXCESS TEMPORARY CODE ***

// client.query(`SELECT column_name from information_schema.columns WHERE table_schema ='public' AND table_name = 'Questions'`, (err, res) => {
//   console.log(res.rows)
//   //client.end()
// })