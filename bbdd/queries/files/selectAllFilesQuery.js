const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const selectAllFilesQuery = async (userId) => {
  try {
    connection = await getConnection();

    const [files] = await connection.query(
      `
    SELECT * FROM files WHERE user_id = ?
    `,
      [userId]
    );

    if (files.length < 1) {
      throw generateError("No files", 404);
    }

    return files;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllFilesQuery;
