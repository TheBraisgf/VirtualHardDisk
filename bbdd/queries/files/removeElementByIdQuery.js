const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const removeElementByIdQuery = async (fileId, idUser) => {
  let connection;

  try {
    connection = await getConnection();

    const [file] = await connection.query(
      `
   UPDATE files SET removed = 1 WHERE id = ? AND user_id = ?    `,
      [fileId, idUser]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = removeElementByIdQuery;
