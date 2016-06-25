# ************************************************************
# Sequel Pro SQL dump
# Version 4499
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 192.168.99.100 (MySQL 5.6.30-76.3)
# Database: chardb
# Generation Time: 2016-06-25 14:08:51 +0000
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
  `thema_id` int(11) NOT NULL,
  `mood_id` int(11) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sentence_thema1_idx` (`thema_id`),
  KEY `fk_dialog_mood1_idx` (`mood_id`),
  CONSTRAINT `fk_dialog_mood1` FOREIGN KEY (`mood_id`) REFERENCES `mood` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sentence_thema1` FOREIGN KEY (`thema_id`) REFERENCES `thema` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table dialog_sentence
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dialog_sentence`;

CREATE TABLE `dialog_sentence` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dialog_id` int(11) NOT NULL,
  `sentence_id` int(11) NOT NULL,
  `index` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_dialog_sentence_dialog1_idx` (`dialog_id`),
  KEY `fk_dialog_sentence_sentence1_idx` (`sentence_id`),
  CONSTRAINT `fk_dialog_sentence_dialog1` FOREIGN KEY (`dialog_id`) REFERENCES `dialog` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_dialog_sentence_sentence1` FOREIGN KEY (`sentence_id`) REFERENCES `sentence` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table mood
# ------------------------------------------------------------

DROP TABLE IF EXISTS `mood`;

CREATE TABLE `mood` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table sentence
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sentence`;

CREATE TABLE `sentence` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mood_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sentence_mood1_idx` (`mood_id`),
  CONSTRAINT `fk_sentence_mood1` FOREIGN KEY (`mood_id`) REFERENCES `mood` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table thema
# ------------------------------------------------------------

DROP TABLE IF EXISTS `thema`;

CREATE TABLE `thema` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sensor_type_id` int(11) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_thema_sensor_type1_idx` (`sensor_type_id`),
  CONSTRAINT `fk_thema_sensor_type1` FOREIGN KEY (`sensor_type_id`) REFERENCES `sensor_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



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



# Dump of table user_option
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_option`;

CREATE TABLE `user_option` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from_dialog_id` int(11) NOT NULL,
  `to_dialog_id` int(11) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_option_dialog1_idx` (`from_dialog_id`),
  KEY `fk_user_option_dialog2_idx` (`to_dialog_id`),
  CONSTRAINT `fk_user_option_dialog1` FOREIGN KEY (`from_dialog_id`) REFERENCES `dialog` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_option_dialog2` FOREIGN KEY (`to_dialog_id`) REFERENCES `dialog` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
