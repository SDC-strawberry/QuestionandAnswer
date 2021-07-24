
/* Table 'Questions' */




CREATE TABLE "Questions" (
id integer,
product_id integer,
body varchar(255),
date_written bigint,
asker_name varchar(90),
asker_email varchar(90),
reported boolean,
helpful integer,
PRIMARY KEY(id));


/* Table 'Answers' */
CREATE TABLE "Answers" (
id integer,
question_id integer,
body varchar(255),
date_written bigint,
answerer_name varchar(90),
answerer_email varchar(90),
reported boolean,
helpful integer,
PRIMARY KEY(id));

/* Table 'photos' */
CREATE TABLE photos (
id integer,
answer_id integer,
url varchar(255),
PRIMARY KEY(id));

/* Table 'Interactions' */
CREATE TABLE "Interactions" (
id integer,
"element " varchar(255),
widget varchar(255),
"time" integer,
PRIMARY KEY(id));

/* Relation 'Questions-Answers' */
ALTER TABLE "Answers" ADD CONSTRAINT "Questions-Answers"
FOREIGN KEY (question_id)
REFERENCES "Questions"(id);

/* Relation 'photos-Answers' */
/*
ALTER TABLE "Answers" ADD CONSTRAINT "photos-Answers"
FOREIGN KEY (photos)
REFERENCES photos(id);
*/



CREATE INDEX idx_Answers_question_id ON "Answers" (question_id);
CREATE INDEX idx_photos_answer_id ON photos (answer_id);
CREATE INDEX idx_Questions_product_id ON "Questions" (product_id);

