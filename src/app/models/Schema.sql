DROP DATABASE IF EXISTS web1rep_2024;
CREATE DATABASE web1rep_2024;
USE web1rep_2024;

CREATE TABLE StatusT(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

INSERT INTO StatusT (nome) 
VALUES 
    ('Não iniciada'), 
    ('Em andamento'), 
    ('Concluída');


CREATE TABLE Tasks(
    id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(200) NOT NULL,
    descricao VARCHAR(400),
    statusT_id INT,
    FOREIGN KEY (statusT_id) REFERENCES StatusT(id)
);

SHOW TABLES;
DESCRIBE Tasks;