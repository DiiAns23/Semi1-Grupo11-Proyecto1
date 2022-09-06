-- languaje= mysql

-- Data para traer su informacion a home
DELIMITER $$
    CREATE PROCEDURE GETDATA(
        IN id_usuario INT
    )
    BEGIN
        SELECT * FROM USUARIO WHERE id_usuario = id_usuario;
    END; $$
DELIMITER ;

-- Agregar un amigo
DELIMITER $$
    CREATE PROCEDURE ADDFRIEND(
        IN id_usuario INT,
        IN id_friend INT
    )
    BEGIN
        DECLARE dato INT;
        SET dato = (SELECT COUNT(*) FROM FRIEND WHERE id_usuario = id_usuario AND id_friend = id_friend);
        IF dato = 0 THEN
            INSERT INTO FRIEND VALUES(id_usuario, id_friend, 0) VALUES(id_usuario, id_friend, 0);
            SET dato = LAST_INSERT_ID();
        ELSE
            SET dato = -1;
        END IF;
        SELECT dato;
    END; $$
DELIMITER ;

-- Aceptar un amigo
DELIMITER $$
    CREATE PROCEDURE ACCEPTFRIEND(
        IN id_usuario INT,
        IN id_friend INT
    )
    BEGIN
        DECLARE dato INT;
        SET dato = (SELECT COUNT(*) FROM FRIEND WHERE id_usuario = id_usuario AND id_friend = id_friend);
        UPDATE FRIEND SET acepted = 1 WHERE id_usuario = id_usuario AND id_friend = id_friend;
    END; $$


