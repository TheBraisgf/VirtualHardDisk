const insertUserQuery = require("../../bbdd/queries/users/insertUserQuery");
const { generateError, newFolder } = require("../../helpers");

const newUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    //Comprobamos que existan todos los datos necesarios para el registro
    if (!username || !email || !password) {
      throw generateError("Missing data", 400);
    }

    //Insertamos el nuevo usuario en la BBDD
    await insertUserQuery(username, email, password);

    await newFolder(username);

    res.status(200).send({
      message: "User and folder created",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newUser;
