# ************************************************************
# Sequel Pro SQL dump
# Version 4499
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 192.168.99.100 (MySQL 5.6.30-76.3)
# Database: chardb
# Generation Time: 2016-06-28 10:42:49 +0000
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

INSERT INTO `dialog` (`id`, `theme_id`, `type`)
VALUES
	(1,1,'Dialog');

/*!40000 ALTER TABLE `dialog` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table dialog_block
# ------------------------------------------------------------

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



# Dump of table RoleMapping
# ------------------------------------------------------------



# Dump of table sensor_type
# ------------------------------------------------------------

LOCK TABLES `sensor_type` WRITE;
/*!40000 ALTER TABLE `sensor_type` DISABLE KEYS */;

INSERT INTO `sensor_type` (`id`, `title`, `description`, `type`)
VALUES
	(1,'GPS',NULL,'SensorType');

/*!40000 ALTER TABLE `sensor_type` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sentence
# ------------------------------------------------------------

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

LOCK TABLES `theme` WRITE;
/*!40000 ALTER TABLE `theme` DISABLE KEYS */;

INSERT INTO `theme` (`id`, `sensor_type_id`, `title`, `description`, `type`)
VALUES
	(1,NULL,'Introduction',NULL,'Theme');

/*!40000 ALTER TABLE `theme` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table User
# ------------------------------------------------------------



# Dump of table user_input
# ------------------------------------------------------------

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
