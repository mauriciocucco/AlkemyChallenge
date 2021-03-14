DROP DATABASE IF EXISTS challengue;

CREATE DATABASE challengue;

USE challengue;

CREATE TABLE usuarios (
    id_usuario int(11) AUTO_INCREMENT NOT NULL,
    nombre_completo varchar(36) NOT NULL,
    email varchar(36) NOT NULL,
    password varchar(40) NOT NULL,
    saldo decimal(8,2) NOT NULL, 

    PRIMARY KEY(id_usuario)

) ENGINE=InnoDB;

CREATE TABLE transacciones (
    id_transaccion int(11) NOT NULL,
    id_usuario1 int(11) NOT NULL,
    id_categoria1 int(11) NULL,
    fecha timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    valor decimal(8,2) NOT NULL,
    concepto varchar(36) NOT NULL,
    tipo enum("ingreso", "egreso") NOT NULL DEFAULT 'ingreso',
    ts_update timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY(id_transaccion),
    CONSTRAINT FK_Usuario FOREIGN KEY (id_usuario1)
    REFERENCES usuarios(id_usuario)
    ON DELETE CASCADE,
    CONSTRAINT FK_Categoria FOREIGN KEY (id_categoria1)
    REFERENCES categorias(id_categoria)
    ON DELETE CASCADE

) ENGINE=InnoDB;

CREATE TABLE categorias (
    id_categoria int(11) AUTO_INCREMENT NOT NULL,
    nombre_categoria varchar(36) NOT NULL,

    PRIMARY KEY(id_categoria)

) ENGINE=InnoDB;


/*------TRIGGERS-------*/

DROP TRIGGER IF EXISTS `challenge`.`ChangeSign`;

DELIMITER $$
USE `challenge`$$
CREATE DEFINER=`root`@`localhost` TRIGGER `ChangeSign` BEFORE INSERT ON `transacciones` FOR EACH ROW
BEGIN
	IF(NEW.tipo = "egreso") THEN
	SET NEW.valor = -(NEW.valor);
    END IF;
END$$
DELIMITER ;



DROP TRIGGER IF EXISTS `challenge`.`CalculateTotal`;

DELIMITER $$
USE `challenge`$$
CREATE DEFINER=`root`@`localhost` TRIGGER `CalculateTotal` AFTER INSERT ON `transacciones` FOR EACH ROW
BEGIN
	SET @id = NEW.id_usuario1;
    SET @valor = NEW.valor;
	UPDATE usuarios SET saldo = saldo + @valor
	WHERE id_usuario = @id;
END$$
DELIMITER ;



DROP TRIGGER IF EXISTS `challenge`.`BeforeUpdate`;

DELIMITER $$
USE `challenge`$$
CREATE DEFINER = CURRENT_USER TRIGGER `BeforeUpdate` BEFORE UPDATE ON `transacciones` FOR EACH ROW
BEGIN
	IF(OLD.tipo = "egreso") THEN
	SET NEW.valor = -(NEW.valor);
    END IF;
END$$
DELIMITER ;



DROP TRIGGER IF EXISTS `challenge`.`NewTotal`;

DELIMITER $$
USE `challenge`$$
CREATE DEFINER=`root`@`localhost` TRIGGER `NewTotal` AFTER UPDATE ON `transacciones` FOR EACH ROW
BEGIN
	SET @id = NEW.id_usuario1;
    SET @suma_valores = (SELECT sum(valor) from transacciones);
	 UPDATE usuarios SET saldo = @suma_valores
     WHERE id_usuario = @id;
END$$
DELIMITER ;



DROP TRIGGER IF EXISTS `challenge`.`AfterDelete`;

DELIMITER $$
USE `challenge`$$
CREATE DEFINER = CURRENT_USER TRIGGER `AfterDelete` AFTER DELETE ON `transacciones` FOR EACH ROW
BEGIN
	SET @id = OLD.id_usuario1;
    SET @suma_valores = (SELECT sum(valor) from transacciones);
	 UPDATE usuarios SET saldo = @suma_valores
     WHERE id_usuario = @id;
END$$
DELIMITER ;