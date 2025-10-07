/*
SQLyog Ultimate v10.00 Beta1
MySQL - 5.5.5-10.11.10-MariaDB-log : Database - u475920781_bann
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

insert  into `registration`(`CP_NO`,`surname`,`firstname`,`middlename`,`otp`,`isValidated`) values ('','Neri','Daniel','Al',123456,1),('09177740231','s','a','b',123456,1),('09562913689','Ebuenga','Edith','Corpuz',123456,1),('09682774886','BALOCO','SANTIAGO','D',123456,1),('09939421226','Songcuan','Jerome','Petonio',123456,1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
