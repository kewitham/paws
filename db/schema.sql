CREATE DATABASE pawfection_db;
USE pawfection_db;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	user_name varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	address varchar(255) NOT NULL,
	dog_name varchar(255) NOT NULL,
	dog_age INT NOT NULL,
	dog_breed varchar(255) NOT NULL,
	dog_temperment varchar(255) NOT NULL,
	date TIMESTAMP,
	PRIMARY KEY (id)
);

CREATE TABLE employees
(
	id int NOT NULL AUTO_INCREMENT,
	employee_name varchar(255) NOT NULL,
	service varchar(255) NOT NULL,
	rate DECIMAL(3,2) NOT NULL,
	date TIMESTAMP,
	PRIMARY KEY (id)
);