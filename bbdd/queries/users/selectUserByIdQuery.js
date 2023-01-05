const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const selectUserById = async (idUser) => {
  let connection;

  try {
    connection = await getConnection();

    const [file] = await connection.query(
      `
   SELECT username FROM users WHERE id = ?`,
      [idUser]
    );

    if (file.length < 1) {
      throw generateError("No users", 404);
    }

    return file[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserById;
