
// GET /qa/questions
// Retrieves a list of questions for a particular product. This list does not include any reported questions.

// SELECT * FROM 



// GET /qa/questions/:question_id/answers
// Returns answers for a given question. This list does not include any reported answers.

// SELECT * FROM


// POST /qa/questions
// Adds a question for the given product

// INSERT INTO

// POST /qa/questions/:question_id/answers
// Adds an answer for the given question

// INSERT INTO


// PUT /qa/questions/:question_id/helpful
// Updates a question to show it was found helpful.

// PUT /qa/questions/:question_id/report
// Updates a question to show it was reported. Note, this action does not delete the question, but the question will not be returned in the above GET request.

// PUT /qa/answers/:answer_id/helpful
// Updates an answer to show it was found helpful.

// PUT /qa/answers/:answer_id/report
// Updates an answer to show it has been reported. Note, this action does not delete the answer, but the answer will not be returned in the above GET request.


// POST /interactions
// Adds a interaction to the db.