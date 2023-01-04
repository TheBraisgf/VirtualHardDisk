const {
  generateError,
  saveFile,
  newFolder,
  newPersonalizedFolder,
} = require("../../helpers");
const isAuth = require("../../middlewares/isAuth");
const insertNewFileQuery = require("../../bbdd/queries/files/insertNewFileQuery");

const newFile = async (req, res, next) => {
  try {
    const user = req.user;

    if (!req.files?.file) {
      throw generateError("Missing File", 400);
    }
    const file = req.files.file;
    const { folder } = req.body;

    //Llamamos a create folder para comprobar y/o crear la carpeta del usuario
    await newFolder(user.username);

    //Guardar el archivo en el disco y obtener su nombre
    const fileExist = await saveFile(req.files.file, user.username, folder);

    //Guardar el nombre archivo en la base de datos.

    await insertNewFileQuery(file.name, user.id);

    if (fileExist) {
      res.send({
        message: "File Exists",
      });
    } else {
      res.status(200).send({
        message: "Upload completed",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = newFile;
