# ************************************************************
# Sequel Pro SQL dump
# Version 4499
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 192.168.99.100 (MySQL 5.6.30-76.3)
# Database: chardb
# Generation Time: 2016-06-27 10:22:13 +0000
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



# Dump of table dialog_user_input
# ------------------------------------------------------------



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



# Dump of table sentence
# ------------------------------------------------------------

LOCK TABLES `sentence` WRITE;
/*!40000 ALTER TABLE `sentence` DISABLE KEYS */;

INSERT INTO `sentence` (`id`, `mood_id`, `title`)
VALUES
	(1,1,'Oh, Hi there and welcome'),
	(2,1,'How are you doing today?'),
	(3,1,'The same, thanks for asking!'),
	(4,1,'So, with whom do I have the pleasure of speaking?'),
	(5,1,'I see. Pretty cool name!'),
	(6,1,'Rather unusual name, huh? I like it!'),
	(7,1,'Nevertheless, Hi there! It’s nice to meet you.'),
	(8,1,'You’re maybe wondering what my name is and\rwhat I’m doing here.'),
	(9,1,'You’re maybe wondering what my name is and what I’m doing here.'),
	(10,1,'Yeah, I get that it’s quite unusual for people to name each other during their first get-together, but nevertheless, could you help me with the namefinding?'),
	(11,1,'Even a silly one would be great. You can’t imagine how it feels to be nameless ... '),
	(12,1,'Aw, thank you! I like it a lot!'),
	(13,1,'So, now that we know each other a little bit, you still may wondering why I’m here. So, let me enlighten you:'),
	(14,1,'Hm ... when I think about it, “companion” sounds rather technical. Imagine me more like a new friend of yours, who’s accompanying you during your daily living.'),
	(15,1,'When I’m talking about accompanying, I’m actually talking about hanging out with you, just like you’re hanging out with your friends!'),
	(16,1,'You do?! Well, that’s even more unusual.'),
	(17,1,'You seem more like the lazy type, aren’t you?'),
	(18,1,'But be it as it may, maybe you can think of something later.'),
	(19,1,'In the meantime, let me tell you what it is, I’m actually doing here'),
	(20,1,'Oh wow, that’s rather rude.'),
	(21,1,'Well, maybe you will lose your shyness later.'),
	(22,1,'In the meantime, let me give you a short introduction in who I am and what I’m actually doing here.'),
	(23,1,'Perhaps that will make you more chatty');

/*!40000 ALTER TABLE `sentence` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table thema
# ------------------------------------------------------------



# Dump of table User
# ------------------------------------------------------------



# Dump of table user_input
# ------------------------------------------------------------

LOCK TABLES `user_input` WRITE;
/*!40000 ALTER TABLE `user_input` DISABLE KEYS */;

INSERT INTO `user_input` (`id`, `title`, `type`)
VALUES
	(1,'Great! How about yourself','option'),
	(2,'Please enter your name','text#name'),
	(3,'Please suggest a name','text#name_suggestion'),
	(4,'I prefer my friends nameless','option'),
	(5,'That’s none of your business!','option');

/*!40000 ALTER TABLE `user_input` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
