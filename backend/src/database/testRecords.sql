INSERT INTO usuarios (id_usuario, nombre_completo, email, password, saldo) VALUES (1, "Mauricio Cucco", "mauriciocucco@gmail.com", MD5("pepe"), 0),
(2, "Ricardo Fort", "mamalaloz@hotmail.com", MD5("loz"), 100000);

INSERT INTO transacciones (id_transaccion, id_usuario1, valor, concepto, tipo) VALUES (1, 1, 20000, 'Deuda', 'egreso'), (2, 2, 100000, 'Pago', 'ingreso'), (3, 2, 20000, 'Deuda', 'egreso'), (4, 2, 100000, 'Pago', 'ingreso'), (5, 1, 40000, 'Deuda', 'egreso'), (6, 2, 300000, 'Pago', 'ingreso'), (7, 2, 20000, 'Deuda', 'egreso'), (8, 1, 200000, 'Pago', 'ingreso');
