CREATE DATABASE  IF NOT EXISTS `test_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `test_db`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: test_db
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `meeting`
--

DROP TABLE IF EXISTS `meeting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meeting` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `topic` varchar(256) DEFAULT NULL,
  `start_time` varchar(256) DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `user_id` varchar(1024) DEFAULT NULL,
  `agenda` varchar(1000) DEFAULT NULL,
  `type` int DEFAULT NULL,
  `settings` varchar(256) DEFAULT NULL,
  `recurrence` varchar(1024) DEFAULT NULL,
  `attendees` varchar(1024) DEFAULT NULL,
  `notattend` varchar(1024) DEFAULT NULL,
  `join_url` varchar(1024) DEFAULT NULL,
  `recording_url` varchar(512) DEFAULT NULL,
  `notes` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89695468186 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meeting`
--

LOCK TABLES `meeting` WRITE;
/*!40000 ALTER TABLE `meeting` DISABLE KEYS */;
INSERT INTO `meeting` VALUES (84576044513,'Board Meeting','2021-08-09T07:40:00.000Z',30,'Wu@gmail.com','Introduce difference project and give all students a brief review for each one. Make sure student understand each project task and goals.\n Student can start to find the gorup members to start the project.',2,'{\'auto_recording\': \'cloud\'}','None','Jiang@gmail.com\nShi@gmail.com\nJohn@gmail.com\nWu@gmail.com',NULL,'https://us02web.zoom.us/j/81702152430?pwd=bG1aeVp2azA2M2JTOGJmYldlbm9idz09','https://us02web.zoom.us/rec/share/Sz67bUMdnt8gwE1FXVTrE-wP7KhgHyY666CsRJM7TP4ENUP3vOwgCZlo8_gG3rYi.IVA-kOQYz2yH19xw',NULL),(84843455675,'Implementation','2021-08-22T07:50:00.000Z',30,'Wu@gmail.com','Step 1: System Design:\nThe first this phase will require you to design the main elements of the application, or service; this includes both back-end and/or front-endcomponents. This part of the phase, thus serves to address “how”your project will be implemented. \nAt the very least, each project should design and present: an entity-relationship (ER) model of data layer. \nsystem architectural diagram, showing the main system components and interactions (e.g., MVC –Model View Controller System Components)',2,'{\'auto_recording\': \'cloud\'}','None','Jiang@gmail.com\nShi@gmail.com\nJohn@gmail.com\nWu@gmail.com',NULL,'https://us02web.zoom.us/j/84843455675?pwd=RmM3bDV0aGt0M3R2ZUhyNmVlUjlGdz09',NULL,NULL),(86340204497,'Planning','2021-08-25T07:00:00.000Z',30,'Wu@gmail.com','This phase is an important part of the process. Most people start their Web Application Project with a general idea, but they do not have a clear direction outlined and do not dedicate much or any effort to the important business marketing and project specification detail and discovery.\nSince this area of the project requires a different type of specialty and experience, I\'ll break this area down into five areas of discovery:\nE-business Direction and Goal Discovery\nBranding and Marketing Discovery\nE-business Method and Process Specification Discovery\nFunctional Specification Discovery\nTechnical Selection Discovery\nE-business Direction and Goal Discovery in any Web Application Project will require knowledge and experinece in the area of e-business and marketing.',2,'{\'auto_recording\': \'cloud\'}','None','Jiang@gmail.com\nShi@gmail.com\nJohn@gmail.com\nWu@gmail.com',NULL,'https://us02web.zoom.us/j/86340204497?pwd=R09uL3YrWTVkVGtsdDZDTThyaUxtZz09',NULL,NULL),(89092396390,'Creative Brainstorming','2021-08-10T07:00:00.000Z',60,'Wu@gmail.com','Design a process, storyboarding can help you see where your collective understanding of a problem supports or conflicts with a proposed solution, and where more thought/research is needed.\nBy developing a visual story to explore the problem at hand as a narrative, your team will be able to see how ideas interact and connect to form a solution.',2,'{\'auto_recording\': \'cloud\'}','None','Jiang@gmail.com\nShi@gmail.com\nJohn@gmail.com\nWu@gmail.com',NULL,'https://us02web.zoom.us/j/89092396390?pwd=eXZHdHZ6bnA1YmI3QkZGUTNScTJnQT09','https://us02web.zoom.us/rec/share/jTQ7HTZ62OomTwqEmm3HsnNj5vA8jnMBZOXabT8RKnWTRv1kZ3MwPeiZ5Tjozc5n.rbGeWF7tp4VtJ5co',NULL);
/*!40000 ALTER TABLE `meeting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mentor`
--

DROP TABLE IF EXISTS `mentor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mentor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(64) NOT NULL,
  `last_name` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `employee_id` varchar(64) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `employee_id` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mentor`
--

LOCK TABLES `mentor` WRITE;
/*!40000 ALTER TABLE `mentor` DISABLE KEYS */;
/*!40000 ALTER TABLE `mentor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `task_id` int DEFAULT NULL,
  `meeting_id` bigint DEFAULT NULL,
  `user_id` varchar(256) DEFAULT NULL,
  `user_email` varchar(256) DEFAULT NULL,
  `task_title` varchar(256) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes`
--

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;
INSERT INTO `notes` VALUES (49,55,84576044513,'Wu@gmail.com',NULL,'Form a group','Form a group.'),(50,56,84576044513,'Wu@gmail.com',NULL,'Choose a topic.','Choose a topic.'),(51,57,89092396390,'Wu@gmail.com',NULL,'Brain Storm','Make clear of objectives and think about useful functions.'),(52,NULL,84576044513,'Jiang@gmail.com',NULL,NULL,'I want to do front end development and I want to choose topic 8.'),(53,NULL,89092396390,'Jiang@gmail.com',NULL,NULL,'thinking...thinking...thinking...'),(54,NULL,84576044513,'Shi@gmail.com',NULL,NULL,'I want to do back-end development and I want to choose topic 8.');
/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recordings`
--

DROP TABLE IF EXISTS `recordings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recordings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subtitles` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recordings`
--

LOCK TABLES `recordings` WRITE;
/*!40000 ALTER TABLE `recordings` DISABLE KEYS */;
/*!40000 ALTER TABLE `recordings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `Task_ID` int NOT NULL AUTO_INCREMENT,
  `User_email` varchar(64) DEFAULT NULL,
  `Task_title` varchar(256) DEFAULT NULL,
  `StartTime` varchar(256) DEFAULT NULL,
  `EndTime` varchar(256) DEFAULT NULL,
  `Creator_email` varchar(64) DEFAULT NULL,
  `Creator_name` varchar(64) DEFAULT NULL,
  `Recv_email` varchar(1024) DEFAULT NULL,
  `Task_status` int DEFAULT NULL,
  `Description` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`Task_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (55,NULL,'Form a group',NULL,'2021-08-10T09:00:00.000Z','Wu@gmail.com',NULL,'Jiang@gmail.com\nJohn@gmail.com\nShi@gmail.com',2,'Choose team members and form a group'),(56,NULL,'Choose a topic.',NULL,'2021-08-09T07:25:24.707Z','Wu@gmail.com',NULL,'Jiang@gmail.com\nJohn@gmail.com\nShi@gmail.com',1,'Choose a topic in all 12 topics.'),(57,NULL,'Brain Storm',NULL,'2021-08-29T07:00:00.000Z','Wu@gmail.com',NULL,'Jiang@gmail.com\nShi@gmail.com\nJohn@gmail.com',0,'Make clear of objectives and think about main functions.');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(64) NOT NULL,
  `lastName` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `role` varchar(64) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'John','Shi','12345678','Shi@gmail.com','student'),(2,'Kathy','Wu','12345678','Wu@gmail.com','mentor'),(3,'Jiayi','Jiang','12345678','Jiang@gmail.com','student'),(4,'John','Shi','12345678','John@gmail.com','student');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-10 15:58:06
