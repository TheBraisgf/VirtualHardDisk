const getConnection = require("../../getConnection");
const bcrypt = require("bcrypt");
const { generateError } = require("../../../helpers");
const { v4: uuidv4 } = require("uuid");

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
      [username.toLowerCase(), email.toLowerCase()]
    );

    if (users.length > 0) {
      throw generateError("User found", 409);
    }

    //Encriptamos la contraseña
    const hashPass = await bcrypt.hash(password, 10);

    let userId = uuidv4();
    //Insertamos el nuevo usuario
    await connection.query(
      `
INSERT INTO  users (id, username, email, password, createdAt)
VALUES (?,?,?,?,?)
`,
      [userId, username, email, hashPass, new Date()]
    );
    return userId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertUserQuery;
