const getConnection = require("../../getConnection");

const insertNewFileQuery = async (fileName, idUser, folder) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `
    INSERT INTO files (user_id, name, folder, createdAt)
    VALUES (?,?,?,?)
    `,
      [idUser, fileName, folder, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertNewFileQuery;
