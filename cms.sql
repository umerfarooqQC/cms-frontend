-- MariaDB dump 10.19  Distrib 10.6.16-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: cms
-- ------------------------------------------------------
-- Server version	10.6.16-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(100) NOT NULL DEFAULT uuid(),
  `title` varchar(255) NOT NULL,
  `type` enum('doc','tmp') DEFAULT NULL,
  `created_dt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_dt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by` int(11) DEFAULT 0,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `title` (`title`),
  UNIQUE KEY `title_owner` (`title`,`created_by`,`type`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'10a16e46-cf82-11ee-85b5-994076906e75','Title 3','tmp','2024-02-19 23:53:56','2024-02-20 13:42:43',1,NULL),(3,'f45f84c6-d0a7-11ee-8096-c85acfd81046','Testing','tmp','2024-02-21 10:57:08','2024-02-21 10:57:08',1,NULL),(4,'f32cf7da-d0de-11ee-83ca-dc047c62772f','testcategory','tmp','2024-02-21 17:30:47','2024-02-21 17:30:47',1,NULL),(9,'a5d4ae92-d14f-11ee-9fb7-2d6268e02b38','Heelo+world','tmp','2024-02-22 11:28:28','2024-02-22 11:28:28',1,NULL),(10,'1807e4ec-d150-11ee-9fb7-2d6268e02b38','Testing 123','tmp','2024-02-22 11:31:40','2024-02-22 11:31:40',1,NULL),(12,'f570dfa6-d150-11ee-9fb7-2d6268e02b38','Testing 12','tmp','2024-02-22 11:37:51','2024-02-22 11:37:51',1,NULL),(13,'8afad14c-d151-11ee-9fb7-2d6268e02b38','Testing121','tmp','2024-02-22 11:42:02','2024-02-22 11:42:02',1,NULL),(15,'10ccc1a5-d152-11ee-9fb7-2d6268e02b38','Business Strategy','tmp','2024-02-22 11:45:47','2024-02-22 11:45:47',1,NULL),(17,'3b220e1c-d152-11ee-9fb7-2d6268e02b38','Dummy Category','tmp','2024-02-22 11:46:58','2024-02-22 11:46:58',1,NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `config`
--

DROP TABLE IF EXISTS `config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `config` (
  `code` varchar(100) NOT NULL,
  `val` varchar(255) DEFAULT NULL,
  `comments` text DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config`
--

LOCK TABLES `config` WRITE;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;
INSERT INTO `config` VALUES ('admin_documents','/home/muhammad/Downloads/uploads/admin/templates',NULL),('document_upload_path','./src/main/resources/documents',NULL),('max_file_size','2',NULL),('template_upload_path','./src/main/resources/templates',NULL),('user_documents','/home/muhammad/Downloads/uploads/cms/documents',NULL);
/*!40000 ALTER TABLE `config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile_authorities`
--

DROP TABLE IF EXISTS `profile_authorities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile_authorities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `profile_id` int(11) NOT NULL,
  `url_id` int(11) DEFAULT 0,
  `request_methods` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_authorities`
--

LOCK TABLES `profile_authorities` WRITE;
/*!40000 ALTER TABLE `profile_authorities` DISABLE KEYS */;
INSERT INTO `profile_authorities` VALUES (1,1,1,'*'),(2,1,2,'*'),(3,1,3,'*'),(4,1,4,'*'),(5,1,5,'*'),(8,2,3,'*'),(9,2,4,'*'),(10,2,5,'*'),(11,1,1,'*'),(12,1,2,'*'),(13,1,3,'*'),(14,1,4,'*'),(15,1,5,'*'),(16,1,6,'*'),(17,1,7,'*'),(18,1,8,'*'),(19,1,9,'*'),(20,1,10,'*'),(21,1,11,'*'),(22,1,12,'*'),(23,1,13,'*'),(24,1,14,'*'),(26,2,3,'*'),(27,2,4,'*'),(28,2,5,'*'),(29,2,8,'*'),(30,2,9,'*'),(31,2,10,'*'),(32,2,12,'*'),(33,2,13,'*');
/*!40000 ALTER TABLE `profile_authorities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(100) NOT NULL DEFAULT uuid(),
  `role` varchar(50) NOT NULL,
  `created_dt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_dt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by` int(11) DEFAULT 0,
  `updated_by` int(11) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `role` (`role`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (1,'a0e27535-c99f-11ee-95e3-c85acfd81046','super_admin','2024-02-12 12:09:54','2024-02-12 12:09:54',0,NULL,0,0),(2,'a0e27812-c99f-11ee-95e3-c85acfd81046','user','2024-02-12 12:09:54','2024-02-12 12:09:54',0,NULL,0,0);
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `templates`
--

DROP TABLE IF EXISTS `templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `templates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(100) NOT NULL DEFAULT uuid(),
  `category_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `actual_file_name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `version` int(11) DEFAULT 1,
  `expiry_date` datetime DEFAULT NULL,
  `created_dt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_dt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by` int(11) DEFAULT 0,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `title_owner` (`title`,`created_by`,`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `templates`
--

LOCK TABLES `templates` WRITE;
/*!40000 ALTER TABLE `templates` DISABLE KEYS */;
INSERT INTO `templates` VALUES (2,'4f7fd63c-d0d3-11ee-83ca-dc047c62772f',3,'Screenshot from 2024-02-20 12-49-19','Screenshot from 2024-02-20 12-49-19.docx',NULL,3,NULL,'2024-02-21 16:07:28','2024-02-22 06:15:04',1,1),(3,'88b87429-d0d3-11ee-83ca-dc047c62772f',3,'template 1','template 1.svg',NULL,2,NULL,'2024-02-21 16:09:04','2024-02-22 06:13:32',1,1),(7,'0f2d145e-d120-11ee-9fb7-2d6268e02b38',4,'Screenshot from 2024-02-21 21-54-38','Screenshot from 2024-02-21 21-54-38.png',NULL,1,NULL,'2024-02-22 05:02:10','2024-02-22 05:02:10',1,NULL),(10,'0401fa2b-d124-11ee-9fb7-2d6268e02b38',1,'Screenshot from 2024-02-21 18-45-20','Screenshot from 2024-02-21 18-45-20.docx',NULL,2,NULL,'2024-02-22 05:30:29','2024-02-22 06:18:57',1,1),(11,'832134f1-d12a-11ee-9fb7-2d6268e02b38',1,'template1(1)','template1(1).png',NULL,2,NULL,'2024-02-22 06:16:59','2024-02-22 06:17:11',1,1),(12,'1f65054f-d14f-11ee-9fb7-2d6268e02b38',1,'My-MIS','My-MIS.docx',NULL,1,NULL,'2024-02-22 11:24:43','2024-02-22 11:24:43',1,NULL);
/*!40000 ALTER TABLE `templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `urls`
--

DROP TABLE IF EXISTS `urls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `urls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `urls`
--

LOCK TABLES `urls` WRITE;
/*!40000 ALTER TABLE `urls` DISABLE KEYS */;
INSERT INTO `urls` VALUES (1,'/api/admin/user'),(2,'/api/admin/profile'),(3,'/api/cms/refresh_token'),(4,'/api/cms/logout'),(5,'/api/cms/updateUser'),(6,'/api/admin/user'),(7,'/api/admin/profile'),(8,'/api/cms/refresh_token'),(9,'/api/cms/logout'),(10,'/api/cms/documents'),(11,'/api/admin/templates'),(12,'/api/cms/documentCategories'),(13,'/api/cms/updateUser'),(14,'/api/admin/templateCategories');
/*!40000 ALTER TABLE `urls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_sessions`
--

DROP TABLE IF EXISTS `user_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_sessions` (
  `user_id` int(11) NOT NULL,
  `access_token` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_sessions`
--

LOCK TABLES `user_sessions` WRITE;
/*!40000 ALTER TABLE `user_sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(100) NOT NULL DEFAULT uuid(),
  `name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone_number` varchar(50) NOT NULL,
  `profile_id` int(11) DEFAULT NULL,
  `password_change_dt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_dt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_dt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by` int(11) DEFAULT 0,
  `updated_by` int(11) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'d28223b4-d0ed-11ee-83ca-dc047c62772f','Mahin','$2a$10$4.IpTZFDZeeJAduuXVBeP.xKmiubsxC3xRQOsz12F1BRMR8vQ4zQ.','test@test.com','03338168884',1,'2024-02-21 19:17:57','2024-02-21 19:17:15','2024-02-21 19:17:57',0,NULL,0,0),(10,'e21d2b8d-d16f-11ee-9fb7-2d6268e02b38','ali','$2a$10$eZOYaRZGeFYewBL7EeqnT.OKx9F0Cez8DqLtKRL4UzMiIY6aRUCPe','test_profile3@gmail.com','22556',2,'2024-02-22 15:19:13','2024-02-22 15:19:13','2024-02-22 15:19:13',1,NULL,0,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-22 17:38:51
