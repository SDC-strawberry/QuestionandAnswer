-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Questions'
-- 
-- ---

DROP TABLE IF EXISTS `Questions`;
		
CREATE TABLE `Questions` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `question_body` VARCHAR(255) NULL DEFAULT NULL,
  `question_date` TIMESTAMP NULL DEFAULT NULL,
  `asker_name` VARCHAR NULL DEFAULT NULL,
  `question_helpfulness` INTEGER NULL DEFAULT NULL,
  `reported` bit NULL DEFAULT NULL,
  `product_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Answers'
-- 
-- ---

DROP TABLE IF EXISTS `Answers`;
		
CREATE TABLE `Answers` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `body` VARCHAR NULL DEFAULT NULL,
  `date` TIMESTAMP NULL DEFAULT NULL,
  `answerer_name` VARCHAR NULL DEFAULT NULL,
  `helpfulness` INTEGER NULL DEFAULT NULL,
  `photos` INTEGER NULL DEFAULT NULL,
  `question_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Photos'
-- 
-- ---

DROP TABLE IF EXISTS `Photos`;
		
CREATE TABLE `Photos` (
  `answer_id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `photo_url` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`answer_id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Answers` ADD FOREIGN KEY (question_id) REFERENCES `Questions` (`id`);
ALTER TABLE `Photos` ADD FOREIGN KEY (answer_id) REFERENCES `Answers` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Questions` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Answers` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Questions` (`id`,`question_body`,`question_date`,`asker_name`,`question_helpfulness`,`reported`,`product_id`) VALUES
-- ('','','','','','','');
-- INSERT INTO `Answers` (`id`,`body`,`date`,`answerer_name`,`helpfulness`,`photos`,`question_id`) VALUES
-- ('','','','','','','');
-- INSERT INTO `Photos` (`answer_id`,`photo_url`) VALUES
-- ('','');