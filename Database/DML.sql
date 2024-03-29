-- languaje= mysql
USE Proyecto1;

-- CREATE NEW USER
DROP PROCEDURE IF EXISTS newUser;
DELIMITER $$
    CREATE PROCEDURE newUser(
        IN _email VARCHAR(50),
        IN _password VARCHAR(255),
        IN _name VARCHAR(50),
        IN _photo VARCHAR(50)
    )
    BEGIN
        DECLARE id INT;
        SET id = (SELECT COUNT(*) FROM USUARIO WHERE email = _email or username = _name);
        IF id = 0 THEN
            INSERT INTO USUARIO (email, password, username, photo) VALUES (_email, _password, _name, _photo);
            SET id = LAST_INSERT_ID();
            SELECT id;
        ELSE
            SET id = -1;
        END IF;
        SELECT id;
    END$$
DELIMITER ;



-- LOGIN USER
DROP PROCEDURE IF EXISTS loginUser;
DELIMITER $$
    CREATE PROCEDURE loginUser(
        IN _name VARCHAR(50),
        IN _password VARCHAR(255)
    )
    BEGIN
        DECLARE id INT;
        SET id = (SELECT id_usuario 
                    FROM USUARIO 
                    WHERE (email = _name or username = _name) and 
                            password = _password
                    );
        IF isnull(id) THEN
            SET id = -1;
        END IF;
        SELECT id;
    END$$
DELIMITER ;

-- Agregar un amigo
DROP PROCEDURE IF EXISTS addFriend;
DELIMITER $$
    CREATE PROCEDURE addFriend(
        IN _id_usuario INT,
        IN _id_friend INT
    )
    BEGIN
        DECLARE id INT;
        SET id = (SELECT COUNT(*) 
					FROM FRIEND 
                    WHERE 
                    (id_usuario_f = _id_usuario AND id_friend_f = _id_friend) OR
                    (id_usuario_f = _id_friend AND id_friend_f = _id_usuario)  
                    );
        IF id = 0 THEN
            INSERT INTO FRIEND(id_usuario_f, id_friend_f, acepted) VALUES(_id_usuario, _id_friend, 0);
            SET id = LAST_INSERT_ID();
        ELSE
            SET id = -1;
        END IF;
        SELECT id;
    END; $$
DELIMITER ;

-- get request friend
DROP PROCEDURE IF EXISTS getRequestF;
DELIMITER $$
    CREATE PROCEDURE getRequestF(
        IN id_usuario INT
    )
    BEGIN
		SELECT * FROM FRIEND WHERE id_friend_f = id_usuario AND acepted = 0;
    END; $$
DELIMITER ;;

-- Aceptar un amigo
DROP PROCEDURE IF EXISTS aceptFriend;
DELIMITER $$
    CREATE PROCEDURE aceptFriend(
        IN id_usuario INT,
        IN id_friend INT
    )
    BEGIN
        DECLARE id INT;
        SET id = (SELECT COUNT(*) FROM FRIEND WHERE id_friend_f = id_usuario AND id_usuario_f = id_friend AND acepted = 0);
        IF id != 0 THEN
			UPDATE FRIEND SET acepted = 1 
				WHERE 
					(id_friend_f = id_usuario AND id_usuario_f = id_friend);  
			
			SELECT id;
		ELSE
			SET id = -1;
			SELECT id;
		END IF;
    END; $$
DELIMITER ;;

-- Recolectar amigos
DROP PROCEDURE IF EXISTS getFriends;
DELIMITER $$
	CREATE PROCEDURE getFriends(
		IN id_usuario INT
	)
    BEGIN
		DECLARE id INT;
        SELECT * FROM FRIEND WHERE ( id_usuario_f = id_usuario OR id_friend_f = id_usuario) AND acepted = 1;
	END; $$
DELIMITER ;;

-- Hacer una publicacion
DROP PROCEDURE IF EXISTS newPublication;
DELIMITER $$
    CREATE PROCEDURE newPublication(
        IN _id_usuario INT,
        IN _name VARCHAR(255),
        IN _archivo VARCHAR(255),
        IN _visibilidad BOOLEAN,
        IN _password VARCHAR(50)
    )
    BEGIN
		DECLARE pass INT;
        DECLARE exis INT;
        SET pass = (SELECT COUNT(*) FROM USUARIO WHERE id_usuario = _id_usuario AND password = _password);
        IF pass != 0 THEN
			SET exis = (SELECT COUNT(*) FROM PUBLICATION WHERE id_usuario = _id_usuario AND nombre = _name);
            IF exis = 0 THEN
				INSERT INTO PUBLICATION(id_usuario, nombre, archivo, visibilidad) VALUES(_id_usuario, _name, _archivo, _visibilidad);
                SELECT LAST_INSERT_ID();      
			ELSE
				SELECT -1;
			END IF;
		ELSE
			SELECT -1;
        END IF;
    END; $$
DELIMITER ;;


-- Eliminar una publicacion
DROP PROCEDURE IF EXISTS deletePublication;
DELIMITER $$
    CREATE PROCEDURE deletePublication(
        IN _id_usuario INT,
        IN _archivo VARCHAR(255),
        IN _password VARCHAR(255)
    )
    BEGIN
		DECLARE id INT;
        SET id = (SELECT COUNT(*) FROM USUARIO WHERE id_usuario = _id_usuario AND password = _password);
        IF id = 1 THEN
			DELETE FROM PUBLICATION WHERE id_usuario = _id_usuario AND nombre = _archivo;
            SELECT id;
		ELSE
			SET id = 0;
			SELECT id;
        END IF;
    END; $$
DELIMITER ;;


-- Editar una publicacion
DROP PROCEDURE IF EXISTS editPublication;
DELIMITER $$
    CREATE PROCEDURE editPublication(
        IN _id_usuario INT,
        IN _nombre VARCHAR(255),
        IN _new_nombre VARCHAR(255),
        IN _visibilidad BOOLEAN,
        IN _password VARCHAR(255)
    )
    BEGIN
		DECLARE id INT;
        SET id = (SELECT COUNT(*) FROM USUARIO WHERE id_usuario = _id_usuario AND password = _password);
        IF id = 1 THEN
			UPDATE PUBLICATION SET nombre = _new_nombre, visibilidad = _visibilidad WHERE id_usuario = _id_usuario AND nombre = _nombre;
            SELECT id;
		ELSE
			SET id = -1;
			SELECT id;
        END IF;
    END; $$
DELIMITER ;;


-- GET DATA TO PUBLICATIONS
DROP PROCEDURE IF EXISTS getDataUser;
DELIMITER $$
	CREATE PROCEDURE getDataUser(
		IN _id_usuario INT
    )
    BEGIN
		SELECT * FROM PUBLICATION WHERE id_usuario = _id_usuario;    
    END; $$
DELIMITER ;;

DROP PROCEDURE IF EXISTS getNames;
DELIMITER $$
	CREATE PROCEDURE getNames(
		IN _id_usuario INT
	)
    BEGIN
		SELECT email, username FROM USUARIO WHERE id_usuario =  _id_usuario ;
	END; $$
DELIMITER ;;

DROP PROCEDURE IF EXISTS getUsers;
DELIMITER $$
	CREATE PROCEDURE getUsers(
		IN _id_usuario INT
	)
    BEGIN
		SELECT id_usuario,email, username FROM USUARIO WHERE id_usuario !=  _id_usuario ;
	END; $$
DELIMITER ;;



USE Proyecto1;

SELECT * FROM USUARIO;

SELECT * FROM FRIEND;

SELECT * FROM PUBLICATION;

CALL getDataUser(1);

CALL addFriend(3,1);
CALL addFriend(5,1);
CALL addFriend(6,1);

CALL getRequestF(1);

CALL aceptFriend(1,5);

CALL getFriends(1);

CALL getUsers(1);

