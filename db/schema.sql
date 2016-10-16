CREATE DATABASE pawfection_db;
USE pawfection_db;

CREATE TABLE users
(
	user_id int NOT NULL AUTO_INCREMENT,
	user_name varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	PRIMARY KEY (user_id)
);

CREATE TABLE services
(
	service_id int NOT NULL AUTO_INCREMENT,
	service_name varchar(255) NOT NULL,
	rate DECIMAL(3,2) NOT NULL,
	PRIMARY KEY (service_id)
);

CREATE TABLE appointments
(
	appointment_id int NOT NULL AUTO_INCREMENT,
	appointment_time TIME,
	PRIMARY KEY (appointment_id),
	FOREIGN KEY (service_id),
	FOREIGN KEY (dog_id)
);

CREATE TABLE dogs
(
	dog_id int NOT NULL AUTO_INCREMENT,
	dog_name varchar(255) NOT NULL,
	age INT NOT NULL,
	breed varchar(255) NOT NULL,
	temperment varchar(255) NOT NULL,
	PRIMARY KEY (dog_id),
	FOREIGN KEY (user_id)
);