# Alkemy`s Challenge

Proyecto correspondiente al challenge de JavaScript de **Alkemy**, en el cual se pedía desarrollar una aplicación para administración de presupuesto personal, que permita crear y editar ingresos y egresos de dinero, y mostrar un balance resultante de las
operaciones registradas.

El _Frontend_ se encuentra hecho con **Angular Material** (https://material.angular.io/) y **Angular CLI** (versión 11.0.4.), con un patrón de diseño **Lazyload**.

El _Backend_ es un API REST construido con **Node.js** y **Express**. La base de datos utlizada fue **MariaDB** y como ORM utilicé **Sequelize**.

## Abrirlo localmente

Instalar y/o disponer de **Angular CLI** (https://angular.io/cli), **Node.js**(https://nodejs.org/en/download/), y para la base de datos **XAMPP**(https://www.apachefriends.org/download.html).

## Iniciar la aplicación (Frontend)

Posicionarse dentro de la carpeta _frontend_ e instalar las dependencias del proyecto con:

```bash
npm install
```

Por último, para abrir la aplicación:

```bash
ng serve -o
```

Abrirá la página en la siguiente URL: `http://localhost:4200/`.

## Iniciar la aplicación (Backend)

Posicionarse dentro de la carpeta _backend_ e instalar las dependencias del proyecto con:

```bash
npm install
```

Abrir XAMPP y darle _start_ a MySQL.

Dentro de _backend/src/database_, existe un archivo llamado **createDB.sql**. Cuenta con la información para crear la base de datos y las tablas necesarias.

Una vez creada la base de datos, abrir una consola, posicionarse en _backend/src_ y escribir:

```bash
nodemon app
```

### Nota

Si todo sale bien debe aparecer en la consola lo siguiente:

```bash
SERVER UP!!
Connection has been stablished succesfully.
```
