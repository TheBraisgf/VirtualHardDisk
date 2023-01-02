const getConnection = require("../../getConnection");

const insertNewFileQuery = async (fileName, idUser) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `
    INSERT INTO files (user_id, name, createdAt)
    VALUES (?,?,?)
    `,
      [idUser, fileName, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertNewFileQuery;
