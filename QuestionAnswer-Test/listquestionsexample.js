//notes from the API database, the answer object from results[3] to results[8] are all empty answer objects
// that is no answers have been reported

var listQuestions = {
  product_id: '22122',
  results: [
    {
      question_id: 153662,
      question_body: 'How long does it last?',
      question_date: '2019-07-06T00:00:00.000Z',
      asker_name: 'funnygirl',
      question_helpfulness: 18,
      reported: false,
      answers: {
        '1444607': {
          id: 1444607,
          body: 'Showing no wear after a few months!',
          date: '2019-09-06T00:00:00.000Z',
          answerer_name: 'sillyguy',
          helpfulness: 13,
          photos: []
        },
        '1992176': {
          id: 1992176,
          body: 'Not long enough apparently',
          date: '2021-06-24T00:00:00.000Z',
          answerer_name: 'Big Boi',
          helpfulness: 0,
          photos: []
        }
      }
    },
    {
      question_id: 153659,
      question_body: 'What fabric is the top made of?',
      question_date: '2018-01-04T00:00:00.000Z',
      asker_name: 'yankeelover',
      question_helpfulness: 6,
      reported: false,
      answers: {
        '1444523': {
          id: 1444523,
          body: "Something pretty soft but I can't be sure",
          date: '2018-01-04T00:00:00.000Z',
          answerer_name: 'metslover',
          helpfulness: 8,
          photos: [
            'https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80',
            'https://images.unsplash.com/photo-1511127088257-53ccfcc769fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
            'https://images.unsplash.com/photo-1500603720222-eb7a1f997356?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80'
          ]
        },
        '1444525': {
          id: 1444525,
          body: 'Its the best! Seriously magic fabric',
          date: '2018-01-04T00:00:00.000Z',
          answerer_name: 'metslover',
          helpfulness: 8,
          photos: []
        },
        '1444526': {
          id: 1444526,
          body: "DONT BUY IT! It's bad for the environment",
          date: '2018-01-04T00:00:00.000Z',
          answerer_name: 'metslover',
          helpfulness: 10,
          photos: []
        },
        '1444575': {
          id: 1444575,
          body: 'Suede',
          date: '2018-11-04T00:00:00.000Z',
          answerer_name: 'metslover',
          helpfulness: 12,
          photos: []
        },
        '1992171': {
          id: 1992171,
          body: 'This is not about the product on this page, but check out these Js!',
          date: '2021-06-23T00:00:00.000Z',
          answerer_name: 'The King',
          helpfulness: 0,
          photos: [
            'blob:http://localhost:3000/ccd6eeae-fb0d-4090-ae1c-9c1e60f55a40',
            'blob:http://localhost:3000/58e6f68f-5c96-4744-aa44-eee11f340f2f',
            'blob:http://localhost:3000/691934c4-5611-4821-9cb3-8e9c3b068208',
            'blob:http://localhost:3000/be153104-6786-48d3-8ae8-ba90e3e79a2b',
            'blob:http://localhost:3000/9f6a5018-4603-4153-9a55-7d5c59fb8c4e'
          ]
        }
      }
      //end of the answers object for this question
    },
    {
      question_id: 213126,
      question_body: 'Do grey and camo match?',
      question_date: '2021-06-24T00:00:00.000Z',
      asker_name: 'curiousgeorge',
      question_helpfulness: 2,
      reported: false,
      answers: {
        '1992177': {
          id: 1992177,
          body: 'Totally. Both are neutrals',
          date: '2021-06-24T00:00:00.000Z',
          answerer_name: 'fashionista',
          helpfulness: 1,
          photos: []
        }
      }
    },
    {
      question_id: 213124,
      question_body: 'What are the wash and care instructions?',
      question_date: '2021-06-23T00:00:00.000Z',
      asker_name: 'girl123',
      question_helpfulness: 1,
      reported: false,
      answers: {}
    },
    {
      question_id: 213127,
      question_body: 'THIS IS MEANT FOR A KING',
      question_date: '2021-06-25T00:00:00.000Z',
      asker_name: 'The King',
      question_helpfulness: 0,
      reported: false,
      answers: {}
    },
    {
      question_id: 213125,
      question_body: 'The top is made of suede',
      question_date: '2021-06-23T00:00:00.000Z',
      asker_name: 'girl123',
      question_helpfulness: 0,
      reported: false,
      answers: {}
    },
    {
      question_id: 213123,
      question_body: 'Does this top run big or small?',
      question_date: '2021-06-23T00:00:00.000Z',
      asker_name: 'girl123',
      question_helpfulness: 0,
      reported: false,
      answers: {}
    },
    {
      question_id: 212819,
      question_body: 'What is the history of the usage of camo prints in the fashion industry?',
      question_date: '2021-06-16T00:00:00.000Z',
      asker_name: 'curious',
      question_helpfulness: 0,
      reported: false,
      answers: {}
    },
    {
      question_id: 212399,
      question_body: 'Is it from France?',
      question_date: '2021-06-09T00:00:00.000Z',
      asker_name: 'r00dy',
      question_helpfulness: 0,
      reported: false,
      answers: {}
    }
  ]
}

export default listQuestions;


// var listQuestions = {
//   "product_id": "5",
//   "results": [{
//         "question_id": 37,
//         "question_body": "Why is this product cheaper here than other sites?",
//         "question_date": "2018-10-18T00:00:00.000Z",
//         "asker_name": "williamsmith",
//         "question_helpfulness": 4,
//         "reported": false,
//         "answers": {
//           68: {
//             "id": 68,
//             "body": "We are selling it here without any markup from the middleman!",
//             "date": "2018-08-18T00:00:00.000Z",
//             "answerer_name": "Seller",
//             "helpfulness": 4,
//             "photos": []
//             // ...
//           }
//         }
//       },
//       {
//         "question_id": 38,
//         "question_body": "How long does it last?",
//         "question_date": "2019-06-28T00:00:00.000Z",
//         "asker_name": "funnygirl",
//         "question_helpfulness": 2,
//         "reported": false,
//         "answers": {
//           70: {
//             "id": 70,
//             "body": "Some of the seams started splitting the first time I wore it!",
//             "date": "2019-11-28T00:00:00.000Z",
//             "answerer_name": "sillyguy",
//             "helpfulness": 6,
//             "photos": [],
//           },
//           78: {
//             "id": 78,
//             "body": "9 lives",
//             "date": "2019-11-12T00:00:00.000Z",
//             "answerer_name": "iluvdogz",
//             "helpfulness": 31,
//             "photos": [],
//           }
//         }
//       },
//   ]
// }


// export default listQuestions;