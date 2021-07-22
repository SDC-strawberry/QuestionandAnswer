

// My Mock Data
import listQuestions from './listquestionsexample.js';
import questionsPerProduct from './questionsPerProduct.js';
import answersPerQuestion from './answersPerQuestion.js';
import $ from 'jquery';
import axios from "axios";






// ********************  TEST INITIALIZATION END  ********************

const currentRoute = 'http://localhost:3000/qa/questions';
 

// ********************  UNIT TESTING SECTION BEGIN  ********************

describe('Unit Test Section: API Routes', () => {


  test('Unit Test 0:  Test to ensure testing is working', () => {
    expect(1).toEqual(1);
  });

  test('Unit Test 1: GET /questions', () => {

    let url = 'http://localhost:3000/qa/questions';

    return axios.get(url)
    .then(success => console.log('result success: '))
    .catch(err => {
      console.log('there was an error: ');
     
    })

  });


  test('Unit Test 2: GET /answers (per question)', () => {

    let url = 'http://localhost:3000/qa/questions/1/answers';

    return axios.get(url)
    .then(success => console.log('result success: '))
    .catch(err => {
      console.log('there was an error: ');
    })

  });

  // test('Unit Test 3: POST new /answers ', () => {

  //   let url = 'http://localhost:3000/qa/questions/1/answers';
  //   let postedAnswer = {
  //     question_id: 1,
  //     body: "test answer body",
  //     date_written: 1599089609530,
  //     answerer_name: "test answer name",
  //     answerer_email: "test answer email",
  //   };

  //   return axios.post(url, postedAnswer)
  //   .then(success => {
  //     console.log('answer post success: ')
  //   })
  //   .catch(err => {
  //     console.log('answer post error: ');
  //   })

  
  // });

  // test('Unit Test 4: POST new /question ', () => {

  //   let url = 'http://localhost:3000/qa/questions/';
  //   let postedQuestion = {
  //     product_id: 1,
  //     body: "test question body",
  //     date_written: 1599089609530,
  //     asker_name: "test question asker name",
  //     asker_email: "test question asker email",
  //   };

  //   return axios.post(url, postedQuestion)
  //   .then(success => {
  //     console.log('question post success: ')
  //   })
  //   .catch(err => {
  //     console.log('question post error: ');
  //   })

    


  //});

  test('Unit Test 5: Mark Question as Helpful', () => {

    let url = 'http://localhost:3000/qa/questions/2/helpful';

    return axios.put(url)
    .then(success => {
      //console.log('q helpful success', success)
      expect(success.status).toBe(200);
    })
    .catch(err => {
      //console.log('q helpful error');
      expect(err.status).toBe(200);
    })

 
  });

  test('Unit Test 6: Report Question', () => {

    let url = 'http://localhost:3000/qa/questions/2/report';

    return axios.put(url)
    .then(success => {
      //console.log('q report success', success)
      expect(success.status).toBe(200);
    })
    .catch(err => {
      //console.log('q report error: ');
      expect(err.status).toBe(200);
    })

  });
  
  test('Unit Test 7: Mark Answer as Helpful', () => {

    let url = 'http://localhost:3000/qa/answers/2/helpful';

    return axios.put(url)
    .then(success => {
      //console.log('a helpful success', success)
      expect(success.status).toBe(200);
    })
    .catch(err => {
      console.log('a helpful error: ');
      expect(err.status).toBe(200);
      
    })

  
  });

  test('Unit Test 8: Report Answer ', () => {

    let url = 'http://localhost:3000/qa/answers/2/report';

    return axios.put(url)
    .then(success => {
      //console.log('a report success', success)
      expect(success.status).toBe(200);
    })
    .catch(err => {
      console.log('a report error: ');
      expect(err.status).toBe(200);
    })

   });


});


// // ********************  UNIT TESTING SECTION END  ********************



// // ********************  INTEGRATION TESTING SECTION BEGIN  ********************

describe('Integration Tests: Routes', () => {


});

// ********************  INTEGRATION TESTING SECTION END  ********************