const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const selectUserByEmailQuery = async (email) => {
  let connection;
  try {
    connection = await getConnection();
    const [users] = await connection.query(
      `
SELECT id, username, email, password, photo, bio FROM users WHERE email = ?
`,
      [email]
    );

    if (users.length < 1) {
      throw generateError("Email not found", 404);
    }

    return users[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserByEmailQuery;
