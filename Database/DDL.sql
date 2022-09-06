CREATE DATABASE Proyecto1;

USE Proyecto1;

CREATE TABLE IF NOT EXISTS USUARIO(
    id_usuario INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    photo VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_usuario)
);

CREATE TABLE IF NOT EXISTS PUBLICATION(
    id_publication INT IDENTITY(1,1) PRIMARY KEY,
    id_usuario INT NOT NULL,
    archivo VARCHAR(50) NOT NULL,
    visibilidad BOOLEAN NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario),
    PRIMARY KEY (id_publication)
);

CREATE TABLE IF NOT EXISTS FRIEND(
    id_usuario INT NOT NULL,
    id_friend INT NOT NULL,
    acepted BOOLEAN NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario),
    FOREIGN KEY (id_friend) REFERENCES USUARIO(id_usuario)
);

