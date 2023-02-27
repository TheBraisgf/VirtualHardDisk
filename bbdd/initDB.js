require("dotenv").config();
const mysql = require("mysql2/promise");
const getConnection = require("./getConnection");
const bcrypt = require("bcrypt");

const main = async () => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(`DROP TABLE IF EXISTS users `);
    await connection.query(`DROP TABLE IF EXISTS files `);

    await connection.query(`
    CREATE TABLE users (
        id VARCHAR(255) PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        photo VARCHAR(255) DEFAULT NULL,
        bio VARCHAR(1000) NOT NULL DEFAULT 'Write something about you!',
        createdAt TIMESTAMP NOT NULL
      )
    `);

    await connection.query(`
      CREATE TABLE files (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        user_id VARCHAR(255),
        FOREIGN KEY (user_id) REFERENCES users(id),
        name VARCHAR(255) NOT NULL,
        folder VARCHAR(255) NOT NULL,
        removed BOOLEAN DEFAULT 0,
        createdAt TIMESTAMP NOT NULL
      );
      `);

    console.info("Create Succesfully!");

    //CREACION DE UN ADMIN

    //Encriptar la contrasena
    const adminPass = await bcrypt.hash(process.env.ADMIN_PASS, 10);

    //Insertar el admin en la BBDD
    await connection.query(
      `
    INSERT INTO  users (id, username, email, password, createdAt)
    VALUES (?,'admin', ?, ?, ?)
    `,
      [process.env.ADMIN_ID, process.env.ADMIN_EMAIL, adminPass, new Date()]
    );
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
};

main();
