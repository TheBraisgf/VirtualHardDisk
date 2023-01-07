const getConnection = require("../../getConnection");
const bcrypt = require("bcrypt");
const { generateError } = require("../../../helpers");

const insertUserQuery = async (username, email, password) => {
  let connection;

  try {
    connection = await getConnection();
    //Tratamos de obtener a un usuario con ese username o email.
    const [users] = await connection.query(
      `
SELECT id FROM users 
WHERE username = ? OR email = ?
`,
      [username, email]
    );

    if (users.length > 0) {
      throw generateError("User found", 409);
    }

    //Encriptamos la contraseña
    const hashPass = await bcrypt.hash(password, 10);

    //Insertamos el nuevo usuario
    await connection.query(
      `
INSERT INTO  users (username, email, password, createdAt)
VALUES (?,?,?,?)
`,
      [username, email, hashPass, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertUserQuery;
