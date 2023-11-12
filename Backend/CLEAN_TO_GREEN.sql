DROP DATABASE IF EXISTS CLEAN_TO_GREEN;
CREATE DATABASE CLEAN_TO_GREEN; 
USE CLEAN_TO_GREEN;

DROP TABLE IF EXISTS DONORS;
CREATE TABLE DONORS (
Donor_name		varchar(30)		not NULL,
Donated_amt		float			not Null,
PRIMARY KEY(Donor_name)
);

DROP TABLE IF EXISTS LOCATIONS;
CREATE TABLE LOCATIONS (
Location		varchar(100)	not NULL,
Garbage_Perc		float		not Null,
PRIMARY KEY(Location)
);


DROP TABLE IF EXISTS ADMINS;
CREATE TABLE ADMINS (
Admin_name		varchar(30)		not NULL,
Admin_pass		varchar(30)		not Null,
Admin_email		varchar(30)		not NULL,
Admin_phone		char(12)		not NUll,		
PRIMARY KEY(Admin_name)
);

DROP TABLE IF EXISTS USERS;
CREATE TABLE USERS (
User_name		varchar(30)		not NULL,
User_pass		varchar(30)		not Null,
User_email		varchar(30)		not NULL,
User_phone		char(12)		not NUll,
PRIMARY KEY(User_pass)
);