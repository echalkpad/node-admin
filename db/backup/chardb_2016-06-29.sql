# ************************************************************
# Sequel Pro SQL dump
# Version 4499
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 192.168.99.100 (MySQL 5.7.11-4)
# Database: chardb
# Generation Time: 2016-06-29 12:07:20 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table AccessToken
# ------------------------------------------------------------

DROP TABLE IF EXISTS `AccessToken`;

CREATE TABLE `AccessToken` (
  `id` varchar(255) NOT NULL,
  `ttl` int(11) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table ACL
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ACL`;

CREATE TABLE `ACL` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model` varchar(512) DEFAULT NULL,
  `property` varchar(512) DEFAULT NULL,
  `accessType` varchar(512) DEFAULT NULL,
  `permission` varchar(512) DEFAULT NULL,
  `principalType` varchar(512) DEFAULT NULL,
  `principalId` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table dialog
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dialog`;

CREATE TABLE `dialog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `theme_id` int(11) NOT NULL,
  `type` varchar(45) DEFAULT 'Dialog',
  PRIMARY KEY (`id`),
  KEY `fk_dialog_theme1_idx` (`theme_id`),
  CONSTRAINT `fk_dialog_theme1` FOREIGN KEY (`theme_id`) REFERENCES `theme` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `dialog` WRITE;
/*!40000 ALTER TABLE `dialog` DISABLE KEYS */;

INSERT INTO `dialog` (`id`, `theme_id`, `type`)
VALUES
	(1,1,'Dialog');

/*!40000 ALTER TABLE `dialog` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table dialog_block
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dialog_block`;

CREATE TABLE `dialog_block` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dialog_id` int(11) NOT NULL,
  `mood_id` int(11) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `is_ice_breaker` int(11) DEFAULT '0',
  `type` varchar(45) DEFAULT 'DialogBlock',
  PRIMARY KEY (`id`),
  KEY `fk_dialog_block_mood1_idx` (`mood_id`),
  KEY `fk_dialog_block_dialog1_idx` (`dialog_id`),
  CONSTRAINT `fk_dialog_block_dialog1` FOREIGN KEY (`dialog_id`) REFERENCES `dialog` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_dialog_block_mood1` FOREIGN KEY (`mood_id`) REFERENCES `mood` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `dialog_block` WRITE;
/*!40000 ALTER TABLE `dialog_block` DISABLE KEYS */;

INSERT INTO `dialog_block` (`id`, `dialog_id`, `mood_id`, `title`, `description`, `is_ice_breaker`, `type`)
VALUES
	(1,1,1,'First introduction 1',NULL,0,'DialogBlock'),
	(2,1,1,'First introduction 2',NULL,0,'DialogBlock'),
	(3,1,1,'First introduction 3',NULL,0,'DialogBlock'),
	(4,1,1,'First introduction 4',NULL,0,'DialogBlock'),
	(5,1,1,'First introduction 5',NULL,0,'DialogBlock'),
	(6,1,1,'First introduction 600',NULL,0,'DialogBlock');

/*!40000 ALTER TABLE `dialog_block` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table dialog_sentence
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dialog_sentence`;

CREATE TABLE `dialog_sentence` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dialog_block_id` int(11) NOT NULL,
  `sentence_id` int(11) NOT NULL,
  `index` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_dialog_block_sentence_dialog1_idx` (`dialog_block_id`),
  KEY `fk_dialog_block_sentence_sentence1_idx` (`sentence_id`),
  CONSTRAINT `fk_dialog_block_sentence_dialog1` FOREIGN KEY (`dialog_block_id`) REFERENCES `dialog_block` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_dialog_block_sentence_sentence1` FOREIGN KEY (`sentence_id`) REFERENCES `sentence` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `dialog_sentence` WRITE;
/*!40000 ALTER TABLE `dialog_sentence` DISABLE KEYS */;

INSERT INTO `dialog_sentence` (`id`, `dialog_block_id`, `sentence_id`, `index`)
VALUES
	(1,1,1,NULL),
	(2,1,2,NULL),
	(4,2,3,NULL),
	(5,2,4,NULL),
	(6,3,5,NULL),
	(7,3,6,NULL),
	(8,3,7,NULL),
	(9,3,8,NULL),
	(10,3,9,NULL),
	(11,3,10,NULL),
	(12,3,11,NULL),
	(14,4,12,NULL),
	(15,4,13,NULL),
	(16,4,14,NULL),
	(17,4,15,NULL),
	(18,4,16,NULL),
	(19,5,17,NULL),
	(20,5,18,NULL),
	(21,5,19,NULL),
	(22,5,20,NULL),
	(23,6,21,NULL),
	(24,6,22,NULL),
	(25,6,23,NULL),
	(26,6,24,NULL);

/*!40000 ALTER TABLE `dialog_sentence` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table dialog_user_input
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dialog_user_input`;

CREATE TABLE `dialog_user_input` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dialog_block_id` int(11) NOT NULL,
  `user_input_id` int(11) NOT NULL,
  `next_dialog_block_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_dialog_block_user_input_dialog1_idx` (`dialog_block_id`),
  KEY `fk_dialog_block_user_input_user_input1_idx` (`user_input_id`),
  KEY `fk_dialog_block_user_input_dialog2_idx` (`next_dialog_block_id`),
  CONSTRAINT `fk_dialog_block_user_input_dialog1` FOREIGN KEY (`dialog_block_id`) REFERENCES `dialog_block` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_dialog_block_user_input_dialog2` FOREIGN KEY (`next_dialog_block_id`) REFERENCES `dialog_block` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_dialog_block_user_input_user_input1` FOREIGN KEY (`user_input_id`) REFERENCES `user_input` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `dialog_user_input` WRITE;
/*!40000 ALTER TABLE `dialog_user_input` DISABLE KEYS */;

INSERT INTO `dialog_user_input` (`id`, `dialog_block_id`, `user_input_id`, `next_dialog_block_id`)
VALUES
	(2,1,1,1),
	(3,1,2,1),
	(4,2,3,1),
	(6,3,4,1),
	(7,3,5,1);

/*!40000 ALTER TABLE `dialog_user_input` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table mood
# ------------------------------------------------------------

DROP TABLE IF EXISTS `mood`;

CREATE TABLE `mood` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `mood` WRITE;
/*!40000 ALTER TABLE `mood` DISABLE KEYS */;

INSERT INTO `mood` (`id`, `title`)
VALUES
	(1,'Neutral'),
	(2,'Amicable'),
	(3,'Provocative');

/*!40000 ALTER TABLE `mood` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Role`;

CREATE TABLE `Role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table RoleMapping
# ------------------------------------------------------------

DROP TABLE IF EXISTS `RoleMapping`;

CREATE TABLE `RoleMapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `principalType` varchar(512) DEFAULT NULL,
  `principalId` varchar(512) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table sensor_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sensor_type`;

CREATE TABLE `sensor_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT 'SensorType',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `sensor_type` WRITE;
/*!40000 ALTER TABLE `sensor_type` DISABLE KEYS */;

INSERT INTO `sensor_type` (`id`, `title`, `description`, `type`)
VALUES
	(1,'GPS',NULL,'SensorType');

/*!40000 ALTER TABLE `sensor_type` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sentence
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sentence`;

CREATE TABLE `sentence` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mood_id` int(11) NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sentence_mood1_idx` (`mood_id`),
  CONSTRAINT `fk_sentence_mood1` FOREIGN KEY (`mood_id`) REFERENCES `mood` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `sentence` WRITE;
/*!40000 ALTER TABLE `sentence` DISABLE KEYS */;

INSERT INTO `sentence` (`id`, `mood_id`, `title`)
VALUES
	(1,1,'Oh, Hi there and welcome.'),
	(2,1,'How are you doing today?'),
	(3,1,'The same, thanks for asking!'),
	(4,1,'So, with whom do I have the pleasure of speaking?'),
	(5,1,'I see. Pretty cool name!'),
	(6,1,'Rather unusual name, huh? I like it!'),
	(7,1,'Nevertheless, Hi there! It’s nice to meet you.'),
	(8,1,'You’re maybe wondering what my name is and what I’m doing here.'),
	(9,1,' Well, it’s quite embaressing, but I’m kind of … nameless.'),
	(10,1,'Yeah, I get that it’s quite unusual for people to name each other during their first get-together, but nevertheless, could you help me with the namefinding?'),
	(11,1,'Even a silly one would be great. You can’t imagine how it feels to be nameless ... '),
	(12,1,'Aw, thank you! I like it a lot!'),
	(13,1,'So, now that we know each other a little bit, you still may wondering why I’m here. So, let me enlighten you:'),
	(14,1,'From this day forth I’m your companion.'),
	(15,1,'Hm ... when I think about it, “companion” sounds rather technical. Imagine me more like a new friend of yours, who’s accompanying you during your daily living.'),
	(16,1,'When I’m talking about accompanying, I’m actually talking about hanging out with you, just like you’re hanging out with your friends!'),
	(17,1,'You do?! Well, that’s even more unusual.'),
	(18,1,'You seem more like the lazy type, aren’t you?'),
	(19,1,'But be it as it may, maybe you can think of something later.'),
	(20,1,'In the meantime, let me tell you what it is, I’m actually doing here'),
	(21,1,'Oh wow, that’s rather rude.'),
	(22,1,'Well, maybe you will lose your shyness later.'),
	(23,1,'In the meantime, let me give you a short introduction in who I am and what I’m actually doing here.'),
	(24,1,'Perhaps that will make you more chatty');

/*!40000 ALTER TABLE `sentence` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table theme
# ------------------------------------------------------------

DROP TABLE IF EXISTS `theme`;

CREATE TABLE `theme` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sensor_type_id` int(11) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT 'Theme',
  PRIMARY KEY (`id`),
  KEY `fk_theme_sensor_type1_idx` (`sensor_type_id`),
  CONSTRAINT `fk_theme_sensor_type1` FOREIGN KEY (`sensor_type_id`) REFERENCES `sensor_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `theme` WRITE;
/*!40000 ALTER TABLE `theme` DISABLE KEYS */;

INSERT INTO `theme` (`id`, `sensor_type_id`, `title`, `description`, `type`)
VALUES
	(1,NULL,'Introduction',NULL,'Theme');

/*!40000 ALTER TABLE `theme` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table User
# ------------------------------------------------------------

DROP TABLE IF EXISTS `User`;

CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `realm` varchar(512) DEFAULT NULL,
  `username` varchar(512) DEFAULT NULL,
  `password` varchar(512) NOT NULL,
  `credentials` text,
  `challenges` text,
  `email` varchar(512) NOT NULL,
  `emailVerified` tinyint(1) DEFAULT NULL,
  `verificationToken` varchar(512) DEFAULT NULL,
  `status` varchar(512) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `lastUpdated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table user_input
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_input`;

CREATE TABLE `user_input` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) DEFAULT NULL,
  `input_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `user_input` WRITE;
/*!40000 ALTER TABLE `user_input` DISABLE KEYS */;

INSERT INTO `user_input` (`id`, `title`, `input_type`)
VALUES
	(1,'Great! How about yourself?','option'),
	(2,'That’s none of your business!','option'),
	(3,'Please enter your name','text#name'),
	(4,'Please suggest a name','text#suggestname'),
	(5,'I prefer my friends nameless','option');

/*!40000 ALTER TABLE `user_input` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
