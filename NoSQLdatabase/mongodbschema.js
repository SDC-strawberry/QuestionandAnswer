db.createCollection("questionsandanswers", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          required: ["product_id","results"],
          properties: {
            product_id: {
                bsonType: "string",
                description: "must be a string and is required"
             },        
             results: {
                bsonType: [ "array" ],
                items: {
                    bsonType: "object",
                    required:["question_id","question_body","question_date","asker_name","question_helpfulness","reported", "answers"],
                    properties:{
                        question_id:{
                            bsonType: "number",
                            description: "must be a number and is required"
                        },
                        question_body:{
                            bsonType: "string",
                            description: "must be a string and is required"
                        },
                        question_date:{
                            bsonType: "string",
                            description: "must be a string and is required"
                        },
                        asker_name:{
                            bsonType: "string",
                            description: "must be a string and is required"
                        }
                        question_helpfulness:{
                            bsonType: "number",
                            description: "must be a number and is required"
                        },
                        reported:{
                            bsonType: "string",
                            description: "must be a string and is required"
                        },
                        answers:{
                            bsonType: "object",
                            description: "must be an object and is required"
                        }
                        /* defines an object of objects  
                        the challenge is that first field has an auto generated name

                        id:{
                            bsonType: "number",
                            description: "must be a number and is required"
                        },
                        body:{
                            bsonType: "string",
                            description: "must be a string and is required"
                        },
                        date:{
                            bsonType: "string",
                            description: "must be a string and is required"
                        },
                        answerer_name:{
                            bsonType: "string",
                            description: "must be a string and is required"
                        },
                        helpfulness:{
                            bsonType: "number",
                            description: "must be a number and is required"
                        },
                        photos:{
                            bsonType: [ "array" ],
                            items: {
                                bsonType: "string"
                            }
                        }
                        */
                    }
                },
                description: 'must be a array of objects containing "question_id","question_body","question_date","asker_name","question_helpfulness","reported"',
             }
          }
       }
    }
 })


 

// const schema = new Schema ({
//     "product_id": String,
//     "results": [
//         {
//             "question_id": 213279,
//             "question_body": "adding to the camo?",
//             "question_date": "2021-07-03T00:00:00.000Z",
//             "asker_name": "Tom",
//             "question_helpfulness": 9,
//             "reported": false,
//             "answers": {
//                 "1992331": {
//                     "id": 1992331,
//                     "body": "You can't see me in this. Absolutely dangerous when crossing the street",
//                     "date": "2021-07-03T00:00:00.000Z",
//                     "answerer_name": "Camo Man",
//                     "helpfulness": 3,
//                     "photos": []
//                 },
//                 "1992335": {
//                     "id": 1992335,
//                     "body": "I don't know, I can't see anything here at all...",
//                     "date": "2021-07-03T00:00:00.000Z",
//                     "answerer_name": "James",
//                     "helpfulness": 1,
//                     "photos": []
//                 },
//                 "1992336": {
//                     "id": 1992336,
//                     "body": "No.",
//                     "date": "2021-07-03T00:00:00.000Z",
//                     "answerer_name": "Squidward",
//                     "helpfulness": 2,
//                     "photos": []
//                 }
//             }
//         },
//         {
//             "question_id": 212819,
//             "question_body": "What is the history of the usage of camo prints in the fashion industry?",
//             "question_date": "2021-06-16T00:00:00.000Z",
//             "asker_name": "curious",
//             "question_helpfulness": 7,
//             "reported": false,
//             "answers": {
//                 "1992323": {
//                     "id": 1992323,
//                     "body": "Meow",
//                     "date": "2021-07-03T00:00:00.000Z",
//                     "answerer_name": "Patterns",
//                     "helpfulness": 1,
//                     "photos": []
//                 },
//                 "1992342": {
//                     "id": 1992342,
//                     "body": "Not sure, but would like to know. ",
//                     "date": "2021-07-03T00:00:00.000Z",
//                     "answerer_name": "tester123",
//                     "helpfulness": 0,
//                     "photos": []
//                 }
//             }
//         }
//     ]
// }