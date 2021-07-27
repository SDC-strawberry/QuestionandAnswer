import http from 'k6/http';
import { sleep } from 'k6';



export let options = {
  stages: [
    { duration: '10s', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '1m', target: 100 }, // stay at 100 users for 10 minutes
    { duration: '10s', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

export default function () {
  var url = 'http://localhost:3000/qa/questions/';

  var payload = JSON.stringify({
    email: 'aaa',
    password: 'bbb',
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // for (var id = 1; id <= 60; id++) {
  //   http.get(`http://localhost:3000/qa/questions/?product_id=${id}`);
  //   sleep(1);
  // }
  //http.get(url);
  // http.post(url, payload, params);

  for (var id = 1; id <= 100; id++) {
    http.get(`http://localhost:3000/qa/questions/${id}/answers`);
    sleep(1);
  }
  
}


