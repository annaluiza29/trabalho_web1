DROP DATABASE IF EXISTS web1rep_2024;
CREATE DATABASE web1rep_2024;
USE web1rep_2024;

CREATE TABLE Tasks(
    id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(200) NOT NULL,
    descricao VARCHAR(400),
    statusT INT NOT NULL
);

SHOW TABLES;
DESCRIBE Tasks;