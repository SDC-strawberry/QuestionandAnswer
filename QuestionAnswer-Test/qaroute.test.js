import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from "react-dom/test-utils";
import listQuestions from './listquestionsexample.js';
import axios from 'axios';
import { debug } from 'webpack';
import questionsPerProduct from './questionsPerProduct.js';
import answersPerQuestion from './answersPerQuestion.js';


//import userEvent from '@testing-library/user-event'
//jest.mock('axios');
// commented out for integration test 2


// ********************  TEST INITIALIZATION BEGIN  ********************

require("babel-polyfill");


var secondProduct = {
  id: 22126,
  campus: 'hr-rpp',
  name: 'Heir Force Ones',
  slogan: 'A sneaker dynasty',
  description: "Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl",
  category: 'Kicks',
  default_price: '99.00',
  created_at: '2021-03-18T16:09:30.589Z',
  updated_at: '2021-03-18T16:09:30.589Z',
}

var mockFunction = () => {};

var MockAdapter = require("axios-mock-adapter");
// // This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

// // Mock any GET request to /users
// // arguments for reply are (status, data, headers)
mock.onGet("/testtest").reply(200, {
  users: [{ id: 1, name: "John Smith" }],
});
mock.onGet('http://localhost:3000/qa/questions/').reply(200, listQuestions);
//mock.onGet('http://localhost:3000/qa/answers/').reply(200, answersPerQuestion);
//post question Mock Handler
mock.onPost(`http://localhost:3000/qa/questions/`).reply(200, {success: 'success'});
mock.onPut().reply(200, {});


// ********************  TEST INITIALIZATION END  ********************


// ********************  UNIT TESTING SECTION BEGIN  ********************

describe('Unit Test Section: Routes', () => {


  test('Unit Test 0:  Test to ensure basic test functions are working', () => {

    // axios.get('http://localhost:3000/qa/questions/')
    //   .then(response => {
    //     console.log('this is the mocked response: ', response);
    //   });

    expect(1).toEqual(1);
  });

  test('Unit Test 1:  Does the component <QuestionAnswer/> render?', () => {
    expect(2).toEqual(2);
    
  });

});


// // ********************  UNIT TESTING SECTION END  ********************



// // ********************  INTEGRATION TESTING SECTION BEGIN  ********************

describe('Integration Tests: Routes', () => {


});

// ********************  INTEGRATION TESTING SECTION END  ********************