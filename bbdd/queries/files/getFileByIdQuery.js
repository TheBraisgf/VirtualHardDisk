const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const getFileById = async (idFile, idUser) => {
  let connection;

  try {
    connection = await getConnection();

    const [file] = await connection.query(
      `
   SELECT name FROM files WHERE id = ? AND user_id = ?
    `,
      [idFile, idUser]
    );

    if (file.length < 1) {
      throw generateError("No files", 404);
    }

    return file[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getFileById;
