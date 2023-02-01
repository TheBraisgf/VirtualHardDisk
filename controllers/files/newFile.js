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

    //Guardar el archivo en el disco y obtener su nombre
    const fileExist = await saveFile(req.files.file, user.id, folder);

    if (fileExist) {
      res.status(409).send({
        message: "File already exists",
      });
    } else {
      //Guardar el nombre archivo en la base de datos.
      let folderName = folder ? folder : user.id;
      await insertNewFileQuery(file.name, user.id, folderName);
      res.status(201).send({
        message: "Upload completed",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = newFile;
