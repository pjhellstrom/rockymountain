DROP DATABASE IF EXISTS rockymountaindb;
CREATE DATABASE rockymountaindb;
USE rockymountaindb;

CREATE TABLE notes (
	userid VARCHAR (100),
    title VARCHAR (100),
    body TEXT (65535),
    category VARCHAR (100),
    format VARCHAR (100),
    id INTEGER (100) AUTO_INCREMENT,
    
    PRIMARY KEY (id)
    );
	
CREATE TABLE users (
	username VARCHAR (100),
    password VARCHAR (100),
    id INTEGER (100) AUTO_INCREMENT,
    
    PRIMARY KEY (id)
    );

SELECT * FROM notes;
SELECT * FROM users;