const path = require("path");
const fs = require("fs");
const selectUserById = require("../../bbdd/queries/users/selectUserByIdQuery");

const createFolder = async (req, res, next) => {
  const user = req.user;
  const { newFolderName } = req.body;

  let userId = await selectUserById(user.id);

  const root = path.join(__dirname, "../../", process.env.ROOT);
  //Comprobamos que exista la carpeta raiz.
  try {
    //Intentamos acceder al directoiro de subida de archivos mediante access.
    await fs.access(root);
  } catch {
    //Si no es posible acceder al directorio lanzara un error y creamos el directorio
    await fs.mkdir(root, (err) => {
      if (err) {
        return console.error(err);
      }
    });
  }

  const newFolderPath = path.join(
    __dirname,
    "../../",
    process.env.ROOT,
    userId.username,
    newFolderName
  );

  //Comprobamos que exista la carpeta NEWFOLDERNAME.
  try {
    //Intentamos acceder al directorio.
    await fs.access(newFolderPath);
  } catch {
    //Si no es posible acceder al directorio lanzara un error y creamos el directorio
    await fs.mkdir(newFolderPath, (err) => {
      if (err) {
        res.status(409).send({
          message: "Directory already Exists!",
        });
        return console.error(err);
      }
      res.status(201).send({
        message: "Directory created successfully!",
      });
    });
  }
};

module.exports = createFolder;
