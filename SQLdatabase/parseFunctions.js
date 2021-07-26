

const buildQuestionObj = function(rowElement) {

  let timeFormat = new Date(0);
  timeFormat.setUTCMilliseconds(rowElement.question_date);

  let new_question_obj = {
    question_id : rowElement.question_id,
    question_body : rowElement.question_body,
    question_date : timeFormat.toISOString(),
    asker_name : rowElement.asker_name,
    question_helpfulness : rowElement.question_helpfulness,
    reported : rowElement.reported,
    answers : {},
  }

  return new_question_obj;
}

const buildAnswerObj = function(rowElement) {
  let timeFormat = new Date(0);
  timeFormat.setUTCMilliseconds(rowElement.answer_date);

  let new_answer_obj = {
    id : rowElement.answer_id,
    body : rowElement.answer_body,
    date : timeFormat.toISOString(),
    answerer_name : rowElement.answerer_name, 
    helpfulness : rowElement.answer_helpfulness,
    photos: {},
  }

  return new_answer_obj;
  
}

const buildPhotoObj = function(rowElement) {
  let built_obj = {
    id: rowElement.photo_id,
    url: rowElement.photo_url,
  }
  return built_obj;
}



const parseGetQuestions = function(results, lowerbound, upperbound) {


  var resultsArray = [];
  var resultsObj = {};
  let rowCounter = 0;

  while (rowCounter < results.length) {

    let qID = results[rowCounter].question_id;
    if (!(qID in resultsObj)) {
      resultsObj[qID] = buildQuestionObj(results[rowCounter]);
    } 

    let aID = results[rowCounter].answer_id;
    if (aID !== null) {
      
      if (!(aID in resultsObj[qID].answers)) {
        resultsObj[qID].answers[aID] = buildAnswerObj(results[rowCounter]);
      } 
    }

    if (results[rowCounter].photo_id !== null) {
      if (!(results[rowCounter].photo_id in resultsObj[qID].answers[aID].photos)) {
        resultsObj[qID].answers[aID].photos[results[rowCounter].photo_id] = buildPhotoObj(results[rowCounter]);
      }
    }


    rowCounter++;    
  }

  // clean up the object by converting Question objects to Array
  for (var x in resultsObj) {

    for (var y in resultsObj[x].answers) {
      if (resultsObj[x].answers[y].photos) {
        // cleans up photos object to array
        var photoarray = [];
        for (var z in resultsObj[x].answers[y].photos) {
          photoarray.push(resultsObj[x].answers[y].photos[z]);
        }
        resultsObj[x].answers[y].photos = photoarray;
      }
    }

    resultsArray.push(resultsObj[x]);
  }

  // parse based on page and count
  return resultsArray.slice(lowerbound, upperbound);
  
}


// old code 
const parseGetQuestionsResponse = function(results) {

  // these are flags
  var previousQuestion_id = results[0].question_id;
  var previousAnswer_id = results[0].answer_id;
  var resultsArray = [];

  let rowCounter = 0;

  while (rowCounter < (results.length - 1) ) {
    // for the outermost
    console.log('Outer RowCounter: ', rowCounter, ' Question_id: ', results[rowCounter].question_id);
    //console.log(`outercurrentId : ${results[rowCounter].question_id}`);

    previousQuestion_id = results[rowCounter].question_id;

    let currentQuestionObj = buildQuestionObj(results[rowCounter]);
    // if there is at least one answer for this question, build the obj
    if (results[rowCounter].answer_id !== null) {
      let currentAnswerObj = buildAnswerObj(results[rowCounter]);
      currentQuestionObj.answers[results[rowCounter].answer_id] = currentAnswerObj;

        // if there is at least one photo url for this answer
        if (results[rowCounter].photos_id !== null) {
          currentAnswerObj.photos.push(buildPhotoObj(results[rowCounter]));
        }
    }

    //rowCounter++;
    //previous no rowCounter++;


    while ((previousQuestion_id === results[rowCounter].question_id) && (rowCounter < (results.length - 1))) {
      // new counter
      console.log('Build Answer RowCounter: ', rowCounter, ' Question_id: ', results[rowCounter].question_id);

      let currentAnswerObj = buildAnswerObj(results[rowCounter]);
      previousAnswer_id = results[rowCounter].answer_id;
      
      // we can probably change this to not even call buildAnswerObj
      if (results[rowCounter].answer_id) {
        currentQuestionObj.answers[results[rowCounter].answer_id] = currentAnswerObj;
      }

        // there might be a first photo under this answer
        if (results[rowCounter].photos_id !== null) {
          currentAnswerObj.photos.push(buildPhotoObj(results[rowCounter]));
          //console.log(buildPhotoObj(results[rowCounter]));
        }

      rowCounter++;

      while (previousAnswer_id === results[rowCounter].answer_id) {

        console.log('Build photo RowCounter: ', rowCounter, ' Question_id: ', results[rowCounter].question_id);


        if (results[rowCounter].photos_id !== null) {
          currentAnswerObj.photos.push(buildPhotoObj(results[rowCounter]));
          //console.log(buildPhotoObj(results[rowCounter]));
        }
        rowCounter++;
      }


      
    }
    resultsArray.push(currentQuestionObj);
  }

  console.log('Loop exited: ', rowCounter, ' Question_id: ', results[rowCounter].question_id);

  if (results[rowCounter]) {
  //added the final answer being cut off
    let currentQuestionObj = buildQuestionObj(results[rowCounter]);
    // if there is at least one answer for this question, build the obj
    if (results[rowCounter].answer_id !== null) {
      let currentAnswerObj = buildAnswerObj(results[rowCounter]);
      currentQuestionObj.answers[results[rowCounter].answer_id] = currentAnswerObj;

        // if there is at least one photo url for this answer
        if (results[rowCounter].photos_id !== null) {
          currentAnswerObj.photos.push(buildPhotoObj(results[rowCounter]));
        }
    }
    resultsArray.push(currentQuestionObj);

  }

  return resultsArray;

}








const parseGetAnswersResponse = function(results) {

  // these are flags
  var previousAnswer_id = results[0].answer_id;
  var resultsArray = [];
  let rowCounter = 0;

  while (rowCounter < (results.length - 1) ) {
    //console.log(`outercurrentId : ${results[rowCounter].question_id}`);

    previousAnswer_id = results[rowCounter].answer_id;

    let currentAnswerObj = buildAnswerObj(results[rowCounter]);
    // if there is at least one answer for this question, build the obj
    
      // if there is at least one photo url for this answer
      if (results[rowCounter].photos_id !== null) {
        currentAnswerObj.photos.push(buildPhotoObj(results[rowCounter]));
      }

      rowCounter++;
      while (previousAnswer_id === results[rowCounter].answer_id) {
        if (results[rowCounter].photos_id !== null) {
          currentAnswerObj.photos.push(buildPhotoObj(results[rowCounter]));
          //console.log(buildPhotoObj(results[rowCounter]));
        }
        rowCounter++;
      }
    
    resultsArray.push(currentAnswerObj);
  }

  if (results[rowCounter]) {
    let currentAnswerObj = buildAnswerObj(results[rowCounter]);

    if (results[rowCounter].photos_id !== null) {
      currentAnswerObj.photos.push(buildPhotoObj(results[rowCounter]));
    }

    resultsArray.push(currentAnswerObj);
  }

  return resultsArray;
}



module.exports = {
  buildQuestionObj,
  buildAnswerObj,
  buildPhotoObj,
  parseGetQuestions,
  parseGetQuestionsResponse,
  parseGetAnswersResponse,
};
