const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const removeElementByFolder = async (folderName) => {
  let connection;

  try {
    connection = await getConnection();

    const [file] = await connection.query(
      `
   UPDATE files SET removed = 1 WHERE folder = ?`,
      [folderName]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = removeElementByFolder;
