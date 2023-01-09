require("dotenv").config();
const mysql = require("mysql2/promise");
const getConnection = require("./getConnection");
const bcrypt = require("bcrypt");

const main = async () => {
  let connection;
  try {
    connection = await getConnection();

    console.log("Cleaning tables...");

    await connection.query(`DROP TABLE IF EXISTS users `);
    await connection.query(`DROP TABLE IF EXISTS files `);

    console.log("Clean succesfully!");
    console.log("Creating tables...");

    await connection.query(`
    CREATE TABLE users (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        photo VARCHAR(255) NOT NULL DEFAULT 'photo',
        bio VARCHAR(1000) NOT NULL DEFAULT 'bio',
        createdAt TIMESTAMP NOT NULL
      )
    `);

    await connection.query(`
      CREATE TABLE files (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        user_id INT UNSIGNED NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        name VARCHAR(255) NOT NULL,
        folder VARCHAR(255) NOT NULL,
        removed BOOLEAN DEFAULT 0,
        createdAt TIMESTAMP NOT NULL
      );
      `);

    console.log("Create Succesfully!");

    //CREACION DE UN ADMIN

    //Encriptar la contrasena
    const adminPass = await bcrypt.hash(process.env.ADMIN_PASS, 10);

    //Insertar el admin en la BBDD
    await connection.query(
      `
    INSERT INTO  users (username, email, password, createdAt)
    VALUES ('admin', ?, ?, ?)
    `,
      [process.env.ADMIN_EMAIL, adminPass, new Date()]
    );
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
};

main();
