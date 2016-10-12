drop database if exists techspardha2017;

create database if not exists techspardha2017;

use techspardha2017;

drop table if exists studentUsers;

create table if not exists studentUsers(
   Id integer primary key auto_increment,
   username varchar(100) unique,
   password varchar(100)
)engine=innodb;

create table if not exists studentDetails(
    username varchar(100) REFERENCES studentUsers (username),
    rollNo integer(10),
    phoneNo integer(15),
    interests varchar(200) 
)engine=innodb;