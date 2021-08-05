import http from 'k6/http';
import { sleep } from 'k6';



export let options = {
  stages: [
    { duration: '30s', target: 1000 }, // simulate ramp-up of traffic from 1 to x users over 5 minutes.
    { duration: '3m', target: 1000 }, // stay at x users for 1 minutes
    { duration: '30s', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

export default function () {
  var url = 'http://localhost:3000/qa/questions/';
  var url2 = 'http://ec2-3-133-87-163.us-east-2.compute.amazonaws.com:3000/qa/questions/?product_id=${id}';


  //GET QUESTIONS ROUTE
  for (var id = 1; id <= 200; id++) {
  http.get(`http://localhost:3000/qa/questions/?product_id=${id}`);
    sleep(1);
  }

  // GET ANSWERS ROUTE
  // for (var id = 1; id <= 100; id++) {
  //   http.get(`http://localhost:3000/qa/questions/${id}/answers`);
  //   sleep(1);
  // }



  var payload = JSON.stringify({
    body: 'Test Question Added K6 testing!',
    name: 'k6_tester',
    email: 'k6test@k6testing.com',
    product_id: 7,
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };


  // POST QUESTIONS TEST
  // var url = 'http://localhost:3000/qa/questions/';

  // for (var id = 1; id <= 10; id++) {
  //   http.post(url, payload, params);
  //   sleep(1);
  // }

  // POST ANSWERS TEST

  // var payload = JSON.stringify({
  //   body: 'Test Question Added K6 testing!',
  //   name: 'k6_tester',
  //   email: 'k6test@k6testing.com',
  //   question_id: 7,
  // });

  // for (var id = 1; id <= 10; id++) {
  //   http.post(`http://localhost:3000/qa/questions/${id}/answers`, payload, params);
  //   sleep(1);
  // }

  // testing the http PUTs
  
  // for (var i = 500; i < 510; i++) {
  //   http.put(`http://localhost:3000/qa/answers/${i}/report`);
  //   sleep(1);
  // }
  
  // for (var i = 500; i < 510; i++) {
  //   http.put(`http://localhost:3000/qa/answers/${i}/helpful`);
  //   sleep(1);
  // }

  // for (var i = 500; i < 510; i++) {
  //   http.put(`http://localhost:3000/qa/questions/${i}/report`);
  //   sleep(1);
  // }

  // for (var i = 500; i < 510; i++) {
  //   http.put(`http://localhost:3000/qa/questions/${i}/helpful`);
  //   sleep(1);
  // }
  
}


