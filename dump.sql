-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: apisday
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `idSender` int DEFAULT NULL,
  `idReceiver` int DEFAULT NULL,
  `idProject` int DEFAULT NULL,
  `message` tinytext,
  `date` datetime DEFAULT NULL,
  `readed` tinyint(1) DEFAULT NULL,
  KEY `idSender` (`idSender`),
  KEY `idReceiver` (`idReceiver`),
  KEY `idProject` (`idProject`),
  CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`idSender`) REFERENCES `users` (`id`),
  CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`idReceiver`) REFERENCES `users` (`id`),
  CONSTRAINT `chat_ibfk_3` FOREIGN KEY (`idProject`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `listsubtasks`
--

DROP TABLE IF EXISTS `listsubtasks`;
/*!50001 DROP VIEW IF EXISTS `listsubtasks`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `listsubtasks` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `description`,
 1 AS `progresso`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `listtasks`
--

DROP TABLE IF EXISTS `listtasks`;
/*!50001 DROP VIEW IF EXISTS `listtasks`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `listtasks` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `description`,
 1 AS `subtasks`,
 1 AS `progresso`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `message_user`
--

DROP TABLE IF EXISTS `message_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message_user` (
  `idMessage` int DEFAULT NULL,
  `idReceiver` int DEFAULT NULL,
  `viewed` tinyint(1) DEFAULT NULL,
  KEY `idMessage` (`idMessage`),
  CONSTRAINT `message_user_ibfk_1` FOREIGN KEY (`idMessage`) REFERENCES `messages` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message_user`
--

LOCK TABLES `message_user` WRITE;
/*!40000 ALTER TABLE `message_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `message_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `type` int DEFAULT NULL,
  `idProject` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idProject` (`idProject`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`idProject`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_users`
--

DROP TABLE IF EXISTS `project_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_users` (
  `idProject` int NOT NULL,
  `idUser` int NOT NULL,
  `permission` int NOT NULL,
  KEY `idProject` (`idProject`),
  KEY `idUser` (`idUser`),
  CONSTRAINT `project_users_ibfk_1` FOREIGN KEY (`idProject`) REFERENCES `projects` (`id`),
  CONSTRAINT `project_users_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_users`
--

LOCK TABLES `project_users` WRITE;
/*!40000 ALTER TABLE `project_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `picture` longblob NOT NULL,
  `description` tinytext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subtask_users`
--

DROP TABLE IF EXISTS `subtask_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subtask_users` (
  `idUser` int DEFAULT NULL,
  `idSubTask` int DEFAULT NULL,
  `finished` tinyint(1) DEFAULT NULL,
  UNIQUE KEY `idUser` (`idUser`,`idSubTask`),
  KEY `idSubTask` (`idSubTask`),
  CONSTRAINT `subtask_users_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`),
  CONSTRAINT `subtask_users_ibfk_2` FOREIGN KEY (`idSubTask`) REFERENCES `subtasks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subtask_users`
--

LOCK TABLES `subtask_users` WRITE;
/*!40000 ALTER TABLE `subtask_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `subtask_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subtasks`
--

DROP TABLE IF EXISTS `subtasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subtasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `description` tinytext NOT NULL,
  `idTask` int NOT NULL,
  `created` date NOT NULL,
  `finished` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idTask` (`idTask`),
  CONSTRAINT `subtasks_ibfk_1` FOREIGN KEY (`idTask`) REFERENCES `tasks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subtasks`
--

LOCK TABLES `subtasks` WRITE;
/*!40000 ALTER TABLE `subtasks` DISABLE KEYS */;
/*!40000 ALTER TABLE `subtasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) DEFAULT NULL,
  `description` tinytext,
  `idProject` int DEFAULT NULL,
  `color` varchar(45) NOT NULL DEFAULT '#00BFA6',
  PRIMARY KEY (`id`),
  KEY `idProject` (`idProject`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`idProject`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `surname` varchar(155) NOT NULL,
  `picture` longblob,
  `email` varchar(150) NOT NULL,
  `birth` date NOT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'apisday'
--

--
-- Dumping routines for database 'apisday'
--
/*!50003 DROP PROCEDURE IF EXISTS `createProject` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `createProject`(name varchar(50),   picture longblob, description tinytext, id int, email varchar(150))
BEGIN
	DECLARE lastId int;
	DECLARE userId int;
    
	select id into userId from users as users where users.id = id and users.email = email;

    if userId = id then
		insert into projects(`name`,`picture`, `description`) values (name, picture, description);
		SELECT LAST_INSERT_ID() into lastId;
		insert project_users (idProject, idUser, permission) values (lastId, userId, 0);
    end if;
    

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteProject` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteProject`(id int)
BEGIN
	delete from `project_users` where project_users.idProject = id; 
	delete from `projects` where projects.id = id; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetChatSummary` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetChatSummary`(IN projectId INT, IN userId INT)
BEGIN
	SELECT
		u.id,
		u.name,
		u.surname,
		ifnull(SUM(case WHEN( c.readed = false)  then 1 else 0 end),0) as numberMessages,
		MAX(c.message) AS lastMessage,
		DATE_FORMAT(MAX(c.date), '%H:%i:%s') AS hourLastMessage
	FROM
		users as u    
		LEFT JOIN chat as c on c.idSender = u.id
		INNER JOIN project_users as p on p.idUser = u.id
	WHERE 
		p.idProject = projectId and u.id != userId
	GROUP BY
		u.id
	ORDER BY
	lastMessage DESC, hourLastMessage DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getContacts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getContacts`(IN projectId INT, IN userId INT)
BEGIN
	SELECT
		u.id,
        u.picture,
		u.name,
		u.surname,
		ifnull(SUM(case WHEN( c.readed = false)  then 1 else 0 end),0) as numberMessages,
		MAX(c.message) AS lastMessage,
		DATE_FORMAT(MAX(c.date), '%H:%i') AS hourLastMessage
	FROM
		users as u    
		LEFT JOIN chat as c on c.idSender = u.id
		INNER JOIN project_users as p on p.idUser = u.id
	WHERE 
		p.idProject = projectId and u.id != userId
	GROUP BY
		u.id
	ORDER BY
	lastMessage DESC, hourLastMessage DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `listCalendar` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `listCalendar`(idUser int, idProject int, dateSelect date)
BEGIN
select t.color, st.name, ifnull(concat(ceil(count(CASE WHEN stu.finished = true THEN 1 END)/count(stu.finished)*100), "%"), "1%") as progress, st.created, st.finished
from tasks as t
join subtasks as st on st.idTask = t.id
join subtask_users as stu on stu.idSubTask = st.id
where stu.idUser = idUser and t.idProject = idProject 
and (st.created <= dateSelect or st.created <= date_add(dateSelect, INTERVAL 14 DAY))
and (st.finished >= dateSelect or st.finished >= date_add(dateSelect, INTERVAL 14 DAY))
group by st.id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `listSubtask` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `listSubtask`(idTask int)
BEGIN
    SELECT 
        `sub`.`id` AS `id`,
        `sub`.`name` AS `name`,
        ifnull(CONCAT(ROUND(((SUM((CASE
                            WHEN (`subuser`.`finished` = TRUE) THEN 1
                            ELSE 0
                        END)) * 100) / COUNT(`subuser`.`finished`)),
                        0),
                '%'), "1%") AS `progress`
    FROM
        (`subtasks` `sub` LEFT JOIN `subtask_users` `subuser` ON ((`subuser`.`idSubTask` = `sub`.`id`)))
	where `sub`.`idTask` = idTask
    GROUP BY `sub`.`id`;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `listSubtaskUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `listSubtaskUser`(idUser int, idTask int)
BEGIN
	select st.id, st.name, stu.finished from 
	subtask_users as stu 
	left join subtasks as st on st.id = idSubTask
	where st.idTask = idTask and stu.idUser = idUser
	group by st.id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `listTask` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `listTask`(idTask int)
BEGIN
	select t.id, t.name, t.color, t.description,
	ifnull(concat(ceil(count(CASE WHEN stu.finished = true THEN 1 END)/count(stu.finished)*100), "%"), "0%") as progress
	from tasks as t
	left join subtasks as st on st.idTask = t.id
	left join subtask_users as stu on stu.idSubTask = st.id
	where t.id = idTask
	group by t.id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `listTasks` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `listTasks`(idProject int)
BEGIN
	select t.id, t.name, t.color,  
	ifnull(concat(ceil(count(CASE WHEN stu.finished = true THEN 1 END)/count(stu.finished)*100), "%"), "0%") as progress
	from tasks as t
	left join subtasks as st on st.idTask = t.id
	left join subtask_users as stu on stu.idSubTask = st.id
	where t.idProject = idProject
	group by t.id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `listTaskUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `listTaskUser`(idUser int, idProject int)
BEGIN
	select t.id, t.color, t.name,
	        ifnull(CONCAT(ROUND(((SUM((CASE
                            WHEN (`stu`.`finished` = TRUE) THEN 1
                            ELSE 0
                        END)) * 100) / COUNT(`stu`.`finished`)),
                        0),
                '%'), "1%") AS `progress`
    
    from 
	subtask_users as stu 
	left join subtasks as st on st.id = idSubTask
	left join tasks as t on t.id = st.idTask
	left join projects as p on p.id = t.idProject
	where p.id = idProject and stu.idUser = idUser
	group by t.id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `listsubtasks`
--

/*!50001 DROP VIEW IF EXISTS `listsubtasks`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `listsubtasks` AS select `sub`.`id` AS `id`,`sub`.`name` AS `name`,`sub`.`description` AS `description`,concat(round(((sum((case when (`subuser`.`finished` = true) then 1 else 0 end)) * 100) / count(`subuser`.`finished`)),0),'%') AS `progresso` from (`subtasks` `sub` join `subtask_users` `subuser` on((`subuser`.`idSubTask` = `sub`.`id`))) group by `sub`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `listtasks`
--

/*!50001 DROP VIEW IF EXISTS `listtasks`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `listtasks` AS select `task`.`id` AS `id`,`task`.`name` AS `name`,`task`.`description` AS `description`,group_concat(distinct `sub`.`id` separator ', ') AS `subtasks`,concat(floor(((sum((case when (`subuser`.`finished` = true) then 1 else 0 end)) * 100) / count(`subuser`.`finished`))),'%') AS `progresso` from ((`tasks` `task` join `subtasks` `sub` on((`sub`.`idTask` = `task`.`id`))) join `subtask_users` `subuser` on((`subuser`.`idSubTask` = `sub`.`id`))) group by `task`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-18 17:10:56
