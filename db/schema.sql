CREATE DATABASE pawfection_db;
USE pawfection_db;

CREATE TABLE users
(
	user_id int NOT NULL AUTO_INCREMENT,
	user_name varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	address varchar(255) NOT NULL,
	date TIMESTAMP,
	PRIMARY KEY (user_id),
	FOREIGN KEY (dog_id),
	FOREIGN KEY (employee_id)
);

CREATE TABLE employees
(
	employee_id int NOT NULL AUTO_INCREMENT,
	employee_name varchar(255) NOT NULL,
	service varchar(255) NOT NULL,
	rate DECIMAL(3,2) NOT NULL,
	date TIMESTAMP,
	PRIMARY KEY (employee_id),
	FOREIGN KEY (user_id),
	FOREIGN KEY (dog_id)
);

CREATE TABLE dogs
(
	dog_id int NOT NULL AUTO_INCREMENT,
	dog_name varchar(255) NOT NULL,
	age INT NOT NULL,
	breed varchar(255) NOT NULL,
	temperment varchar(255) NOT NULL,
	date TIMESTAMP,
	PRIMARY KEY (dog_id),
	FOREIGN KEY (user_id),
	FOREIGN KEY (employee_id)
);