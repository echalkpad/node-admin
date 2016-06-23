# ************************************************************
# Sequel Pro SQL dump
# Version 4499
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 192.168.99.100 (MySQL 5.6.30-76.3)
# Database: chardb
# Generation Time: 2016-06-23 14:14:08 +0000
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

LOCK TABLES `dialog` WRITE;
/*!40000 ALTER TABLE `dialog` DISABLE KEYS */;

INSERT INTO `dialog` (`id`, `thema_id`, `dialog_type_id`, `title`, `description`)
VALUES
	(1,1,1,'gehst du wieder rauchen?',NULL),
	(2,1,1,'ok alles klar. Würdest du später nochmal ...',NULL),
	(3,1,1,'ok. bis später',NULL);

/*!40000 ALTER TABLE `dialog` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table dialog_type
# ------------------------------------------------------------

LOCK TABLES `dialog_type` WRITE;
/*!40000 ALTER TABLE `dialog_type` DISABLE KEYS */;

INSERT INTO `dialog_type` (`id`, `title`, `description`)
VALUES
	(1,'provokant',NULL),
	(2,'normal',NULL);

/*!40000 ALTER TABLE `dialog_type` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Role
# ------------------------------------------------------------



# Dump of table RoleMapping
# ------------------------------------------------------------



# Dump of table thema
# ------------------------------------------------------------

LOCK TABLES `thema` WRITE;
/*!40000 ALTER TABLE `thema` DISABLE KEYS */;

INSERT INTO `thema` (`id`, `tracker_type_id`, `title`, `description`)
VALUES
	(1,1,'rauchen',NULL);

/*!40000 ALTER TABLE `thema` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tracker_type
# ------------------------------------------------------------

LOCK TABLES `tracker_type` WRITE;
/*!40000 ALTER TABLE `tracker_type` DISABLE KEYS */;

INSERT INTO `tracker_type` (`id`, `title`, `description`)
VALUES
	(1,'provokant',NULL);

/*!40000 ALTER TABLE `tracker_type` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table User
# ------------------------------------------------------------



# Dump of table user_option
# ------------------------------------------------------------

LOCK TABLES `user_option` WRITE;
/*!40000 ALTER TABLE `user_option` DISABLE KEYS */;

INSERT INTO `user_option` (`id`, `from_dialog_id`, `to_dialog_id`, `title`, `description`)
VALUES
	(2,1,2,'geht dich ein furts an',NULL),
	(4,2,3,'hör auf mich zu nerven',NULL);

/*!40000 ALTER TABLE `user_option` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
