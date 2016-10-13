drop database if exists techspardha2017;

create database if not exists techspardha2017;

use techspardha2017;

drop table if exists studentUsers;

create table if not exists studentUsers(
   Id integer primary key auto_increment,
   username varchar(100) unique NOT NULL,
   password varchar(100) NOT NULL
)engine=innodb;

create table if not exists studentDetails(
    Id integer REFERENCES studentUsers (Id) ,
    rollNo integer(10) NOT NULL,
    phoneNo integer(15) NOT NULL,
    interests varchar(200) NOT NULL,
    branch varchar(30) NOT NULL,
    year varchar(20) NOT NULL,
    college varchar(50) NOT NULL,
    gender varchar(10) NOT NULL
)engine=innodb;

create table if not exists eventsList(
  eventName varchar(100) PRIMARY KEY,
  description varchar(100) NOT NULL,
  venue varchar(100) NOT NULL,
  `time` varchar(100), /*To be changed to time later on*/
  status varchar(100) NOT NULL
)engine=innodb;

create table if not exists coordinatorPanel(
  coordinatorId integer REFERENCES adminUsers (Id),
  eventName varchar(100) REFERENCES eventsList (eventName)
)engine=innodb;

create table if not exists adminUsers(
   Id integer primary key auto_increment,
   username varchar(100) unique NOT NULL,
   password varchar(100) NOT NULL
)engine=innodb;
