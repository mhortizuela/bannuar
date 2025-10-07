/*
SQLyog Ultimate v10.00 Beta1
MySQL - 5.5.5-10.4.32-MariaDB : Database - u475920781_bann
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`u475920781_bann` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `u475920781_bann`;

/*Table structure for table `citizen_users` */

DROP TABLE IF EXISTS `citizen_users`;

CREATE TABLE `citizen_users` (
  `citizenId` int(11) NOT NULL AUTO_INCREMENT,
  `lname` varchar(50) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `mi` varchar(1) NOT NULL,
  `contactNumber` varchar(25) NOT NULL,
  `citizenPassword` varchar(35) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `image` text DEFAULT NULL,
  PRIMARY KEY (`citizenId`),
  KEY `citizenId` (`citizenId`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `citizen_users` */

insert  into `citizen_users`(`citizenId`,`lname`,`fname`,`mi`,`contactNumber`,`citizenPassword`,`createdAt`,`image`) values (7,'','','','9939421226','1','2024-10-17 04:09:12',NULL),(14,'','','','9939421226','1','2024-10-17 08:18:14',NULL);

/*Table structure for table `deployment_members` */

DROP TABLE IF EXISTS `deployment_members`;

CREATE TABLE `deployment_members` (
  `memberId` int(11) NOT NULL AUTO_INCREMENT,
  `deploymentId` int(11) NOT NULL,
  `policeId` int(11) NOT NULL,
  `current_lat` double DEFAULT NULL,
  `current_lng` double DEFAULT NULL,
  `role` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`memberId`),
  KEY `deploymentId` (`deploymentId`),
  KEY `policeId` (`policeId`),
  CONSTRAINT `deployment_members_ibfk_1` FOREIGN KEY (`deploymentId`) REFERENCES `deployments` (`deploymentId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `deployment_members_ibfk_2` FOREIGN KEY (`policeId`) REFERENCES `police` (`policeId`)
) ENGINE=InnoDB AUTO_INCREMENT=203 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `deployment_members` */

insert  into `deployment_members`(`memberId`,`deploymentId`,`policeId`,`current_lat`,`current_lng`,`role`) values (75,27,32,11.24226616203902,125.00247587928733,NULL),(76,27,33,11.237250910872818,124.99965691705529,NULL),(77,27,34,11.238201853211217,124.99486851544341,NULL),(78,28,33,11.247407018136604,125.00125954490599,NULL),(79,28,34,11.251746670673358,125.00378471920202,NULL),(80,28,35,11.25135358454319,124.99424376566313,NULL),(81,29,34,11.240828075239266,125.00623907976015,NULL),(82,29,35,11.24238117363618,124.99601862945363,NULL),(83,29,36,11.240619626912856,124.99987224675657,NULL),(84,30,35,11.24717235359751,125.00307502827103,NULL),(85,30,36,11.243528081115818,125.01124532131921,NULL),(86,30,37,11.241312363801807,124.9936558556046,NULL),(87,31,36,11.2500121871708,124.99992336959339,NULL),(88,31,37,11.237250287007765,125.00731132681186,NULL),(89,31,38,11.24047577358919,125.00127488806358,NULL),(90,32,37,11.236617120103546,125.00009093688018,NULL),(91,32,38,11.242273324643508,124.99592381313018,NULL),(92,32,39,11.240469092273582,124.99940402253057,NULL),(93,33,38,11.245282836385327,124.99503211488812,NULL),(94,33,39,11.244982065837805,125.00664398507789,NULL),(95,33,40,11.249943728429205,124.99661668746558,NULL),(96,34,39,11.23892225259348,125.00759120112387,NULL),(97,34,40,11.236859248392145,125.00035263914229,NULL),(98,34,41,11.242855451088255,124.9980493385676,NULL),(99,35,40,11.2493503401264,125.00143368548243,NULL),(100,35,41,11.246787407586144,124.99646598203664,NULL),(101,35,42,11.247637687977988,124.99762049433322,NULL),(102,36,41,11.25085940828533,125.0102655589802,NULL),(103,36,42,11.250419570598202,125.00613117660362,NULL),(104,36,43,11.249067171776721,124.99377232962594,NULL),(105,37,42,11.245330133352727,124.99416367843902,NULL),(106,37,43,11.240497992690177,125.00482892868699,NULL),(107,37,44,11.236320665917649,125.00594654408046,NULL),(108,38,43,11.236440723202593,125.00319398432477,NULL),(109,38,44,11.24031775256927,124.99483681042524,NULL),(110,38,45,11.240900794971633,125.00482354413563,NULL),(111,39,44,11.235085336316448,124.99978604972856,NULL),(112,39,45,11.245344240246652,124.99419305260079,NULL),(113,39,46,11.240602542817214,125.0052635568369,NULL),(114,40,45,11.238180156286035,124.99594011147269,NULL),(115,40,46,11.23483008905856,125.00716011142794,NULL),(116,40,47,11.246980290517184,124.99825111885532,NULL),(117,41,46,11.237984723278299,124.9980002603787,NULL),(118,41,47,11.24571713261186,125.00141488247637,NULL),(119,41,48,11.239593015099487,124.99655042862153,NULL),(120,42,47,11.251643098362381,124.99939420650053,NULL),(121,42,48,11.247711737968682,125.00720607089504,NULL),(122,42,49,11.244565141122374,125.00403749347994,NULL),(123,43,48,11.238162044585824,124.99952774304248,NULL),(124,43,49,11.234822582008142,124.99635968146647,NULL),(125,43,50,11.247000661861144,124.9947542654595,NULL),(126,44,49,11.23843934226728,125.0107639155111,NULL),(127,44,50,11.236171551306883,125.0053960105543,NULL),(128,44,31,11.2341353994041,125.01131896591077,NULL),(129,45,50,11.251858631894784,125.01016626229479,NULL),(130,45,31,11.246925416342837,125.006958295383,NULL),(131,45,32,11.245685228439678,125.0103812566026,NULL),(132,46,31,11.248520598247191,124.99628922198136,NULL),(133,46,32,11.241554315718398,125.00373391320113,NULL),(134,46,33,11.245676619403685,125.00201135796823,NULL),(135,47,43,11.242696932183287,125.01028058756496,NULL),(136,48,43,11.238982141828139,125.00289894699903,NULL),(137,48,46,11.249218310063899,125.00422470987563,NULL),(140,49,39,11.243138619739684,125.00584896962471,NULL),(141,49,43,11.25149898945772,125.00677803896767,NULL),(142,50,37,11.249063227018391,125.00981201874215,NULL),(143,50,40,11.2355404132088,125.00509601037075,NULL),(144,51,41,11.234528812780528,124.99618603334362,NULL),(145,51,44,11.247013728929687,124.9953405451708,NULL),(146,52,43,11.241331539618152,125.00546606313155,NULL),(147,52,46,11.237005697356533,125.00746029794121,NULL),(150,54,43,11.246574014355955,125.00351553418024,NULL),(151,54,45,11.247525628386546,124.99391153994522,NULL),(155,56,41,11.248933258199994,125.00689011530615,NULL),(156,56,38,11.239320802483999,124.99676366705472,NULL),(157,57,43,NULL,NULL,NULL),(158,57,42,NULL,NULL,NULL),(164,60,43,NULL,NULL,NULL),(174,59,36,NULL,NULL,'team leader'),(175,55,37,NULL,NULL,'team leader'),(176,55,42,NULL,NULL,'member'),(177,55,46,NULL,NULL,'member'),(181,53,37,NULL,NULL,'team leader'),(182,53,42,NULL,NULL,'member'),(183,61,34,NULL,NULL,'team leader'),(184,61,38,NULL,NULL,'member'),(185,61,35,NULL,NULL,'member'),(191,62,41,NULL,NULL,'team leader'),(192,62,40,NULL,NULL,'member'),(196,63,42,NULL,NULL,'team leader'),(197,63,38,NULL,NULL,'member'),(198,64,36,NULL,NULL,'team leader'),(199,64,42,NULL,NULL,'member'),(200,58,37,NULL,NULL,'team leader'),(201,58,40,NULL,NULL,'member'),(202,58,41,NULL,NULL,'member');

/*Table structure for table `deployments` */

DROP TABLE IF EXISTS `deployments`;

CREATE TABLE `deployments` (
  `deploymentId` int(11) NOT NULL AUTO_INCREMENT,
  `precinctId` int(11) NOT NULL,
  `userId` int(11) NOT NULL COMMENT 'Dispatcher Id',
  `deploymentNumber` varchar(25) NOT NULL,
  `description` text NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `deploymentAddress` varchar(255) NOT NULL,
  `fireArms` varchar(255) NOT NULL,
  `comDevices` varchar(255) NOT NULL,
  `patrolBodyNumber` varchar(50) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `status` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  PRIMARY KEY (`deploymentId`),
  KEY `deploymentCode` (`description`(768))
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `deployments` */

insert  into `deployments`(`deploymentId`,`precinctId`,`userId`,`deploymentNumber`,`description`,`lat`,`lng`,`deploymentAddress`,`fireArms`,`comDevices`,`patrolBodyNumber`,`startDate`,`endDate`,`status`,`type`) values (27,8,0,'DEP-0001','Barangay patrol',14.591,120.981,'Brgy. 123, Manila','2','2','PB001','2025-07-01 00:00:00','2025-07-02 00:00:00','Active','Checkpoint'),(28,9,0,'DEP-0002','Checkpoint at QC',14.612,121.042,'Checkpoint Alpha, QC','3','1','PB002','2025-07-02 00:00:00','2025-07-03 00:00:00','Active','Checkpoint'),(29,10,0,'DEP-0003','VIP escort duty',14.65,121,'Ortigas Center, Pasig','5','3','PB003','2025-07-03 00:00:00','2025-07-04 00:00:00','Active','Checkpoint'),(30,11,0,'DEP-0004','Night surveillance',14.7,121.03,'Marikina Heights','4','2','PB004','2025-07-04 00:00:00','2025-07-05 00:00:00','Active','Checkpoint'),(31,12,0,'DEP-0005','Anti-drug op',14.74,121.07,'Batasan Hills, QC','6','4','PB005','2025-07-05 00:00:00','2025-07-06 00:00:00','Active','Checkpoint'),(32,13,0,'DEP-0006','Community visit',14.52,121.06,'Barangay Tandang Sora','2','1','PB006','2025-07-06 00:00:00','2025-07-07 00:00:00','Active','Checkpoint'),(33,14,0,'DEP-0007','Motorcycle patrol',14.53,121.045,'Brgy. Bagong Pag-asa','3','2','PB007','2025-07-07 00:00:00','2025-07-08 00:00:00','Active','Checkpoint'),(34,15,0,'DEP-0008','Intel op',14.54,121.035,'San Mateo checkpoint','4','2','PB008','2025-07-08 00:00:00','2025-07-09 00:00:00','Active','Checkpoint'),(35,16,0,'DEP-0009','Coastal patrol',14.56,121.025,'Navotas fish port','5','3','PB009','2025-07-09 00:00:00','2025-07-10 00:00:00','Active','Checkpoint'),(36,17,0,'DEP-0010','Quick response standby',14.57,121.01,'Makati CBD','6','4','PB010','2025-07-10 00:00:00','2025-07-11 00:00:00','Active','Checkpoint'),(37,18,0,'DEP-0011','Drug sweep op',14.58,121.015,'Pasay police post','3','2','PB011','2025-07-11 00:00:00','2025-07-12 00:00:00','Active','Checkpoint'),(38,19,0,'DEP-0012','Market area patrol',14.59,121.02,'Divisoria market','2','1','PB012','2025-07-12 00:00:00','2025-07-13 00:00:00','Active','Checkpoint'),(39,20,0,'DEP-0013','Border checkpoint',14.6,121.025,'Antipolo border','5','2','PB013','2025-07-13 00:00:00','2025-07-14 00:00:00','Active','Checkpoint'),(40,21,0,'DEP-0014','Barangay support',14.61,121.03,'Pateros main road','4','1','PB014','2025-07-14 00:00:00','2025-07-15 00:00:00','Active','Checkpoint'),(41,22,0,'DEP-0015','Traffic reroute',14.62,121.035,'Katipunan Ave., QC','3','2','PB015','2025-07-15 00:00:00','2025-07-16 00:00:00','Active','Checkpoint'),(42,23,0,'DEP-0016','School security',14.63,121.04,'UP Diliman Area','2','2','PB016','2025-07-16 00:00:00','2025-07-17 00:00:00','Active','Checkpoint'),(43,24,0,'DEP-0017','High-risk arrest',14.64,121.045,'Cubao Terminal','5','3','PB017','2025-07-17 00:00:00','2025-07-18 00:00:00','Active','Checkpoint'),(44,25,0,'DEP-0018','Curfew enforcement',14.65,121.05,'Valenzuela checkpoint','4','2','PB018','2025-07-18 00:00:00','2025-07-19 00:00:00','Active','Checkpoint'),(45,26,0,'DEP-0019','Roving night patrol',14.66,121.055,'Commonwealth Ave','3','1','PB019','2025-07-19 00:00:00','2025-07-20 00:00:00','Active','Checkpoint'),(46,27,0,'DEP-0020','Disaster rescue drill',14.67,121.06,'Marikina River Park','6','4','PB020','2025-07-20 00:00:00','2025-07-21 00:00:00','Active','Checkpoint'),(47,14,0,'444','1222',2323.56566,23232.766,'112222','12','12','1233333','2025-07-09 06:50:00','2025-07-10 16:55:00','Active','Checkpoint'),(48,10,0,'123','123',1212,1212,'1212','1','1','122','2025-07-21 21:32:00','2025-07-22 21:33:00','Active','checkpoint'),(49,12,0,'12333','2323',23232,2323,'2323','22','221','22','2025-07-21 21:48:00','2025-07-22 21:48:00','Active','checkpoint'),(50,16,0,'233','2323',23,23,'232','23','2','2','2025-07-21 22:00:00','2025-07-22 22:00:00','Active','Checkpoint'),(51,13,0,'7899','67',55666,666,'666','N/A','56','666','2025-07-21 23:00:00','2025-07-22 23:00:00','Active','Bicycle'),(52,13,35,'443','333',333,33,'333','32233','233332','33','2025-07-25 20:58:00','2025-07-25 20:58:00','Active','Checkpoint'),(53,13,35,'12378','43545',4555,454,'45','N/A','tttt','4544','2025-07-24 21:29:00','2025-07-29 21:29:00','Active','Bicycle'),(54,14,35,'566','555',5666,566,'666','N/A','5666','665','2025-07-25 21:32:00','2025-07-25 21:32:00','Active','Foot'),(55,13,35,'8996','566',5666,66655,'66','1','78977','54','2025-07-17 21:35:00','2025-07-23 21:35:00','Active','Checkpoint'),(56,15,35,'5577','454',455,5555,'4555','455','555','4455','2025-07-24 22:02:00','2025-07-25 22:02:00','Active','Mobile'),(57,12,35,'12223','1222',2323,2323,'2','23','23232','2323','2025-08-10 20:24:00','2025-08-15 23:21:00','Active','Checkpoint'),(58,18,35,'8977','777',2323.56566,23232.766,'112222','5445','5455','1222222','2025-08-13 20:34:00','2025-08-21 20:35:00','Active','Checkpoint'),(59,13,35,'8987','777',7887,788,'888','34444','333444','8888','2025-08-14 20:44:00','2025-08-21 20:44:00','Active','Checkpoint'),(60,15,35,'2333','333',7777,7777,'88987','N/A','89988','1222222','2025-08-10 20:50:00','2025-08-11 20:50:00','Active','Foot'),(61,11,35,'8908','34344',34444,4333,'334','N/A','3344','334','2025-08-15 21:57:00','2025-08-16 21:59:00','Active','Bicycle'),(62,13,35,'66754','334',4443,33344,'3444','N/A','hhhh','4444','2025-08-11 22:07:00','2025-08-12 22:07:00','Active','Foot'),(63,13,35,'7544','232',2333,3333,'333','N/A','332222','333','2025-08-11 22:15:00','2025-08-12 22:15:00','Active','Foot'),(64,15,35,'895434','3434',343434,3434,'3434','344','3434','3434','2025-08-11 22:29:00','2025-08-12 22:29:00','Active','Checkpoint');

/*Table structure for table `dispatcher` */

DROP TABLE IF EXISTS `dispatcher`;

CREATE TABLE `dispatcher` (
  `dispatcherId` int(11) NOT NULL,
  `policeId` int(11) NOT NULL,
  `precinctId` int(11) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  PRIMARY KEY (`dispatcherId`),
  KEY `precinctId` (`precinctId`),
  KEY `policeId` (`policeId`),
  CONSTRAINT `dispatcher_ibfk_1` FOREIGN KEY (`precinctId`) REFERENCES `precincts` (`precinctId`),
  CONSTRAINT `dispatcher_ibfk_2` FOREIGN KEY (`policeId`) REFERENCES `police` (`policeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `dispatcher` */

/*Table structure for table `incident_report` */

DROP TABLE IF EXISTS `incident_report`;

CREATE TABLE `incident_report` (
  `reportID` bigint(20) NOT NULL AUTO_INCREMENT,
  `cp_no` varchar(30) DEFAULT NULL,
  `incidentType` varchar(20) DEFAULT NULL,
  `message` varchar(200) DEFAULT NULL,
  `gpsLocation` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`reportID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `incident_report` */

/*Table structure for table `incident_reports` */

DROP TABLE IF EXISTS `incident_reports`;

CREATE TABLE `incident_reports` (
  `incidentId` int(11) NOT NULL AUTO_INCREMENT,
  `reportID` int(11) NOT NULL,
  `citizenId` int(11) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `message` text NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'REPORTED',
  `reportdate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`incidentId`),
  KEY `citizenId` (`citizenId`),
  CONSTRAINT `incident_reports_ibfk_1` FOREIGN KEY (`citizenId`) REFERENCES `citizen_users` (`citizenId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `incident_reports` */

insert  into `incident_reports`(`incidentId`,`reportID`,`citizenId`,`lat`,`lng`,`message`,`status`,`reportdate`) values (28,0,7,16.32637,120.37111,'test report1','REPORTED','2025-06-18 03:33:13'),(29,0,7,16.32637,120.37111,'test report1','REPORTED','2025-06-18 03:33:13'),(30,0,7,16.32637,120.37111,'test 1','RESPONDED','2025-06-18 03:33:13'),(31,0,7,16.3243,120.37241,'123 test','RESPONDED','2025-06-18 03:33:13');

/*Table structure for table `police` */

DROP TABLE IF EXISTS `police`;

CREATE TABLE `police` (
  `pesAccount` varchar(150) NOT NULL COMMENT 'email address',
  `access_token` text DEFAULT NULL COMMENT 'access token for sso',
  `policeId` int(11) NOT NULL AUTO_INCREMENT,
  `badgeNumber` varchar(50) NOT NULL,
  `lname` varchar(150) NOT NULL,
  `fname` varchar(150) NOT NULL,
  `mi` varchar(3) NOT NULL,
  `ext` varchar(5) DEFAULT NULL,
  `rankId` int(11) NOT NULL,
  `contactNumber` varchar(50) NOT NULL,
  `precinctId` int(11) NOT NULL,
  PRIMARY KEY (`policeId`),
  KEY `rankId` (`rankId`),
  KEY `precinctId` (`precinctId`),
  CONSTRAINT `police_ibfk_1` FOREIGN KEY (`rankId`) REFERENCES `ranks_lookup` (`rankId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `police_ibfk_2` FOREIGN KEY (`precinctId`) REFERENCES `precincts` (`precinctId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `police` */

insert  into `police`(`pesAccount`,`access_token`,`policeId`,`badgeNumber`,`lname`,`fname`,`mi`,`ext`,`rankId`,`contactNumber`,`precinctId`) values ('pes001',NULL,31,'BN0001','Cruz','Juan','D',NULL,4,'09171234567',8),('pes002',NULL,32,'BN0002','Santos','Maria','L',NULL,5,'09181234567',9),('pes003',NULL,33,'BN0003','Reyes','Carlos','M',NULL,6,'09192234567',10),('pes004',NULL,34,'BN0004','Dela Cruz','Jose','A',NULL,7,'09173456789',11),('pes005',NULL,35,'BN0005','Garcia','Ana','T',NULL,8,'09184567890',12),('pes006',NULL,36,'BN0006','Lopez','Mark','R',NULL,9,'09195678901',13),('pes007',NULL,37,'BN0007','Fernandez','Isabel','C',NULL,10,'09206789012',14),('pes008',NULL,38,'BN0008','Torres','Paulo','J',NULL,11,'09217890123',15),('pes009',NULL,39,'BN0009','Ramos','Karla','B',NULL,12,'09228901234',16),('pes010',NULL,40,'BN0010','Mendoza','Leo','S',NULL,13,'09239012345',17),('pes011',NULL,41,'BN0011','Bautista','Grace','E',NULL,14,'09172345678',18),('pes012',NULL,42,'BN0012','Aquino','Lorenzo','F',NULL,15,'09183456789',19),('pes013',NULL,43,'BN0013','Navarro','Faith','G',NULL,16,'09194567890',20),('pes014',NULL,44,'BN0014','Silva','Jonas','H',NULL,17,'09205678901',21),('pes015',NULL,45,'BN0015','Villanueva','Jasmine','I',NULL,18,'09216789012',22),('pes016',NULL,46,'BN0016','Agustin','Nico','K',NULL,19,'09227890123',23),('pes017',NULL,47,'BN0017','Domingo','Ella','L',NULL,4,'09238901234',24),('pes018',NULL,48,'BN0018','Salazar','Miguel','N',NULL,5,'09249012345',25),('pes019',NULL,49,'BN0019','Morales','Janine','O',NULL,6,'09173451234',26),('pes020',NULL,50,'BN0020','Padilla','Andre','P',NULL,7,'09184562345',27);

/*Table structure for table `precincts` */

DROP TABLE IF EXISTS `precincts`;

CREATE TABLE `precincts` (
  `precinctId` int(11) NOT NULL AUTO_INCREMENT,
  `precinctNumber` varchar(50) NOT NULL,
  `precinctName` varchar(150) NOT NULL,
  `lat` double NOT NULL,
  `lng` double unsigned NOT NULL,
  `address` text NOT NULL,
  PRIMARY KEY (`precinctId`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `precincts` */

insert  into `precincts`(`precinctId`,`precinctNumber`,`precinctName`,`lat`,`lng`,`address`) values (8,'1001','Precinct Baguio',16.4023,120.596,'Session Rd, Baguio City, Benguet'),(9,'1002','Precinct Davao',7.1907,125.4553,'San Pedro St, Davao City, Davao del Sur'),(10,'1003','Precinct Cebu',10.3157,123.8854,'Colon St, Cebu City, Cebu'),(11,'1004','Precinct Ilocos Norte',18.1978,120.5957,'Marcos Ave, Laoag City, Ilocos Norte'),(12,'1005','Precinct Zamboanga',6.9214,122.079,'La Purisima St, Zamboanga City'),(13,'1006','Precinct Makati',14.5547,121.0244,'Ayala Ave, Makati City'),(14,'1007','Precinct Tagaytay',14.1008,120.983,'Tagaytay-Nasugbu Hwy, Tagaytay City, Cavite'),(15,'1008','Precinct Legazpi',13.1391,123.7438,'Peñaranda St, Legazpi City, Albay'),(16,'1009','Precinct Tacloban',11.2445,125.0037,'Justice Romualdez St, Tacloban City, Leyte'),(17,'1010','Precinct General Santos',6.1164,125.1716,'Roxas East Blvd, GenSan, South Cotabato'),(18,'1011','Precinct Bohol',9.6556,123.85,'Carlos P. Garcia Ave, Tagbilaran City, Bohol'),(19,'1012','Precinct Vigan',17.5748,120.3865,'Crisologo St, Vigan City, Ilocos Sur'),(20,'1013','Precinct Angeles',15.144,120.5896,'MacArthur Hwy, Angeles City, Pampanga'),(21,'1014','Precinct Cagayan de Oro',8.4542,124.6319,'Don Apolinar Velez St, CDO, Misamis Oriental'),(22,'1015','Precinct Naga',13.6218,123.1948,'Peñafrancia Ave, Naga City, Camarines Sur'),(23,'1016','Precinct San Fernando',15.0306,120.6847,'Jose Abad Santos Ave, San Fernando, Pampanga'),(24,'1017','Precinct Kalibo',11.7061,122.3644,'Toting Reyes St, Kalibo, Aklan'),(25,'1018','Precinct Butuan',8.9495,125.5436,'Montilla Blvd, Butuan City, Agusan del Norte'),(26,'1019','Precinct Baybay',10.6822,124.7996,'Rizal St, Baybay City, Leyte'),(27,'1020','Precinct Marawi',8.0004,124.283,'Amai Pakpak Ave, Marawi City, Lanao del Sur');

/*Table structure for table `ranks_lookup` */

DROP TABLE IF EXISTS `ranks_lookup`;

CREATE TABLE `ranks_lookup` (
  `rankId` int(11) NOT NULL AUTO_INCREMENT,
  `rank` varchar(50) NOT NULL,
  PRIMARY KEY (`rankId`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `ranks_lookup` */

insert  into `ranks_lookup`(`rankId`,`rank`) values (4,'PAT'),(5,'PCpl'),(6,'PSSg'),(7,'PMSg'),(8,'PSMS'),(9,'PCMS'),(10,'PEMS'),(11,'PLt'),(12,'PCpt'),(13,'PMaj'),(14,'PLtCol'),(15,'PCol'),(16,'PBGen'),(17,'PMGen'),(18,'PLtGen'),(19,'PGen');

/*Table structure for table `registration` */

DROP TABLE IF EXISTS `registration`;

CREATE TABLE `registration` (
  `CP_NO` varchar(30) NOT NULL,
  `surname` varchar(30) DEFAULT NULL,
  `firstname` varchar(30) DEFAULT NULL,
  `middlename` varchar(30) DEFAULT NULL,
  `otp` int(6) DEFAULT NULL,
  `isValidated` int(1) DEFAULT NULL,
  PRIMARY KEY (`CP_NO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `registration` */

insert  into `registration`(`CP_NO`,`surname`,`firstname`,`middlename`,`otp`,`isValidated`) values ('09269769030','Calub','Librado','Mendones',123456,1),('09568708765','songcuan','jerome','petonio',123456,1),('09608182660','Ebuenga','Edith','Corpuz',123456,1),('09939421226','songcuan','jerome','p',123456,1);

/*Table structure for table `response` */

DROP TABLE IF EXISTS `response`;

CREATE TABLE `response` (
  `responseId` int(11) NOT NULL,
  `incidentId` int(11) NOT NULL,
  `deploymentId` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `incidentReport` text NOT NULL,
  `noticeOfExplanation` text NOT NULL,
  `ResponseDate` datetime NOT NULL,
  `CompletedDate` datetime NOT NULL,
  PRIMARY KEY (`responseId`),
  KEY `incidentId` (`incidentId`),
  KEY `response_ibfk_2` (`deploymentId`),
  CONSTRAINT `response_ibfk_1` FOREIGN KEY (`incidentId`) REFERENCES `incident_reports` (`incidentId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `response_ibfk_2` FOREIGN KEY (`deploymentId`) REFERENCES `deployments` (`deploymentId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `response` */

/*Table structure for table `system_user` */

DROP TABLE IF EXISTS `system_user`;

CREATE TABLE `system_user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `username` char(255) NOT NULL COMMENT 'email',
  `password` text NOT NULL,
  `role` char(25) NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `policeId` int(11) NOT NULL,
  `verificationToken` char(11) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`userId`),
  KEY `policeId` (`policeId`),
  CONSTRAINT `system_user_ibfk_1` FOREIGN KEY (`policeId`) REFERENCES `police` (`policeId`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `system_user` */

insert  into `system_user`(`userId`,`username`,`password`,`role`,`isActive`,`policeId`,`verificationToken`,`email_verified_at`) values (15,'admin01','pass123','Administrator',1,31,NULL,NULL),(16,'regdisp01','pass123','Regional Dispatch',1,32,NULL,NULL),(17,'provdisp01','pass123','Provincial Dispatch',1,33,NULL,NULL),(18,'mundisp01','pass123','Municipal Dispatch',1,34,NULL,NULL),(19,'admin02','pass123','Administrator',1,35,NULL,NULL),(20,'regdisp02','pass123','Regional Dispatch',1,36,NULL,NULL),(21,'provdisp02','pass123','Provincial Dispatch',1,37,NULL,NULL),(22,'mundisp02','pass123','Municipal Dispatch',1,38,NULL,NULL),(23,'admin03','pass123','Administrator',1,39,NULL,NULL),(24,'regdisp03','pass123','Regional Dispatch',1,40,NULL,NULL),(25,'provdisp03','pass123','Provincial Dispatch',1,41,NULL,NULL),(26,'mundisp03','pass123','Municipal Dispatch',1,42,NULL,NULL),(27,'admin04','pass123','Administrator',1,43,NULL,NULL),(28,'regdisp04','pass123','Regional Dispatch',1,44,NULL,NULL),(29,'provdisp04','pass123','Provincial Dispatch',1,45,NULL,NULL),(30,'mundisp04','pass123','Municipal Dispatch',1,46,NULL,NULL),(31,'admin05','pass123','Administrator',1,47,NULL,NULL),(32,'regdisp05','pass123','Regional Dispatch',1,48,NULL,NULL),(33,'provdisp05','pass123','Provincial Dispatch',1,49,NULL,NULL),(34,'mundisp05','pass123','Municipal Dispatch',1,50,NULL,NULL),(35,'mhortizuela@dmmmsu.edu.ph','$2y$12$4weu21EKJpmkSH9WYcqxMuNh/qCgXMd.b82v8DVMA.enqsJfaZdoW','Administrator',1,39,NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
