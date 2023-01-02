const mysql = require("mysql2/promise");

//Destructuring de la variables de entorno de la BBDD

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_BBDD } = process.env;

//Crear una variable que contendra las conexiones libres a la base de datos
let pool;

//Creamos la funcion que obtendra el pool de conexiones
const getConnection = async () => {
  try {
    if (!pool) {
      pool = await mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        database: MYSQL_BBDD,
        timezone: "Z",
      });
    }

    //Retornamos una conexion libre con la base de datos
    return await pool.getConnection();
  } catch (err) {
    console.error(err);
    throw new Error("MYSQL Connection error");
  }
};

module.exports = getConnection;
