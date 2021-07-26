import http from 'k6/http';
import { sleep } from 'k6';

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

  for (var id = 1; id <= 100; id++) {
    http.get(`http://localhost:3000/qa/questions/?product_id=${id}`);
    sleep(1);
  }
  //http.get(url);
  // http.post(url, payload, params);
  
}


