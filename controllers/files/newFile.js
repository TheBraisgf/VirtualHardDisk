const { generateError, saveFile, newFolder } = require("../../helpers");

const insertNewFileQuery = require("../../bbdd/queries/files/insertNewFileQuery");
const selectUserById = require("../../bbdd/queries/users/selectUserByIdQuery");

const newFile = async (req, res, next) => {
  try {
    const user = req.user;

    if (!req.files?.file) {
      throw generateError("Missing File", 400);
    }
    const file = req.files.file;
    const { folder } = req.body;

    const username = await selectUserById(user.id);

    //Llamamos a create folder para comprobar y/o crear la carpeta del usuario
    await newFolder(username);

    //Guardar el archivo en el disco y obtener su nombre
    const fileExist = await saveFile(req.files.file, username, folder);

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
