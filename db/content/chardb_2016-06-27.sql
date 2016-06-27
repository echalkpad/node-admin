# ************************************************************
# Sequel Pro SQL dump
# Version 4499
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 192.168.99.100 (MySQL 5.6.30-76.3)
# Database: chardb
# Generation Time: 2016-06-27 09:21:32 +0000
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



# Dump of table ACL
# ------------------------------------------------------------



# Dump of table dialog
# ------------------------------------------------------------



# Dump of table dialog_sentence
# ------------------------------------------------------------



# Dump of table mood
# ------------------------------------------------------------

LOCK TABLES `mood` WRITE;
/*!40000 ALTER TABLE `mood` DISABLE KEYS */;

INSERT INTO `mood` (`id`, `title`, `description`)
VALUES
	(1,'Neutral',NULL),
	(2,'Amicable',NULL),
	(3,'Provocative',NULL);

/*!40000 ALTER TABLE `mood` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Role
# ------------------------------------------------------------



# Dump of table RoleMapping
# ------------------------------------------------------------



# Dump of table sensor_type
# ------------------------------------------------------------



# Dump of table sentence
# ------------------------------------------------------------

LOCK TABLES `sentence` WRITE;
/*!40000 ALTER TABLE `sentence` DISABLE KEYS */;

INSERT INTO `sentence` (`id`, `mood_id`, `title`)
VALUES
	(1,1,'Oh, Hi there and welcome.'),
	(2,1,'How are you doing over there?'),
	(3,1,'You maybe wondering who I am and what I’m doing here, huh?'),
	(4,1,'Well, to get things started, let me tell a little bit about myself.'),
	(5,1,'First of all: I’m your Character.'),
	(6,1,'Actually, I’m not only your Character, but “Character” is also the name people gave me.'),
	(7,1,'Yeah, I know, it’s a strange one, people are curious about it all the time. For convenience sake, just call me “C” '),
	(8,1,'But enough of me, how about you? With whom do I have the pleasure of speaking?');

/*!40000 ALTER TABLE `sentence` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table thema
# ------------------------------------------------------------

LOCK TABLES `thema` WRITE;
/*!40000 ALTER TABLE `thema` DISABLE KEYS */;

INSERT INTO `thema` (`id`, `sensor_type_id`, `title`, `description`)
VALUES
	(1,NULL,'introduction',NULL);

/*!40000 ALTER TABLE `thema` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table User
# ------------------------------------------------------------



# Dump of table user_input
# ------------------------------------------------------------




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
