const { generateError, saveFile } = require("../../helpers");
const isAuth = require("../../middlewares/isAuth");
const insertNewFileQuery = require("../../bbdd/queries/files/insertNewFileQuery");

const newFile = async (req, res, next) => {
  try {
    if (!req.files?.file) {
      throw generateError("Missing File", 400);
    }

    let userInfo = isAuth();
    //Guardar el archivo en el disco y obtener su nombre
    const fileName = await saveFile(req.files.file, userInfo.username);

    //Guardar el nombre archivo en la base de datos.

    await insertNewFileQuery(fileName, userInfo.id);
  } catch (err) {
    next(err);
  }
};

module.exports = newFile;
