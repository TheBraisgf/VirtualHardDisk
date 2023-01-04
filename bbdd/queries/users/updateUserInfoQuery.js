const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const updateUserInfoQuery = async (username, photo, bio, idUser) => {
  let connection;
  try {
    connection = await getConnection();
    const [users] = await connection.query(
      `
UPDATE users SET username = ?, photo = ?, bio = ? WHERE id = ?
`,
      [username, photo, bio, idUser]
    );

    if (users.length < 1) {
      throw generateError("Id not found", 404);
    }

    return users[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateUserInfoQuery;
