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
    username varchar(100) REFERENCES studentUsers (username) NOT NULL,
    rollNo integer(10) NOT NULL,
    phoneNo integer(15) NOT NULL,
    interests varchar(200) NOT NULL,
    branch varchar(30) NOT NULL,
    year varchar(20) NOT NULL,
    college varchar(50) NOT NULL,
    gender varchar(10) NOT NULL
)engine=innodb;
