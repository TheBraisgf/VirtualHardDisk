const { generateError, saveFile } = require("../../helpers");
const isAuth = require("../../middlewares/isAuth");
const insertNewFileQuery = require("../../bbdd/queries/files/insertNewFileQuery");

const newFile = async (req, res, next) => {
  try {
    const user = req.user;

    if (!req.files?.file) {
      throw generateError("Missing File", 400);
    }
    const file = req.files.file;
    //Guardar el archivo en el disco y obtener su nombre
    await saveFile(req.files.file, user.username);

    //Guardar el nombre archivo en la base de datos.

    await insertNewFileQuery(file.name, user.id);

    res.status(200).send({
      message: "Upload completed",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newFile;
