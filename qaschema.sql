-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Questions'
-- 
-- ---


DROP DATABASE IF EXISTS q_a;

CREATE DATABASE q_a;

DROP TABLE IF EXISTS Questions;
		
CREATE TABLE Questions (
  id INT NOT NULL AUTO_INCREMENT,
  question_body VARCHAR(255) NOT NULL,
  question_date VARCHAR(50) NOT NULL,
  asker_name VARCHAR(50) NOT NULL,
  question_helpfulness INT NOT NULL,
  reported bit NOT NULL,
  product_id INT NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Answers'
-- 
-- ---

DROP TABLE IF EXISTS Answers;
		
CREATE TABLE Answers (
  id INT NOT NULL AUTO_INCREMENT,
  body VARCHAR(255),
  answer_date VARCHAR(50),
  answerer_name VARCHAR(50) NOT NULL,
  helpfulness INT NOT NULL,
  photos INT NOT NULL,
  question_id INT NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Photos'
-- 
-- ---

DROP TABLE IF EXISTS Photos;
		
CREATE TABLE Photos (
  answer_id INT AUTO_INCREMENT NOT NULL,
  photo_url VARCHAR(255) NOT NULL,
  PRIMARY KEY (answer_id)
);

-- ---
-- Table 'Interactions'
-- 
-- ---

DROP TABLE IF EXISTS `Interactions`;
		
CREATE TABLE Interactions (
  id INT AUTO_INCREMENT NOT NULL,
  element VARCHAR(255) NOT NULL,
  widget VARCHAR(255) NOT NULL,
  time VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE Answers ADD FOREIGN KEY (question_id) REFERENCES Questions (id);
ALTER TABLE Photos ADD FOREIGN KEY (answer_id) REFERENCES Answers (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Questions` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Answers` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Interactions` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Questions` (`id`,`question_body`,`question_date`,`asker_name`,`question_helpfulness`,`reported`,`product_id`) VALUES
-- ('','','','','','','');
-- INSERT INTO `Answers` (`id`,`body`,`date`,`answerer_name`,`helpfulness`,`photos`,`question_id`) VALUES
-- ('','','','','','','');
-- INSERT INTO `Photos` (`answer_id`,`photo_url`) VALUES
-- ('','');
-- INSERT INTO `Interactions` (`id`,`element`,`widget`,`time`) VALUES
-- ('','','','');
CREATE INDEX idx_Answers_question_id ON "Answers" (question_id);
CREATE INDEX idx_photos_answer_id ON photos (answer_id);
CREATE INDEX idx_Questions_product_id ON "Questions" (product_id);