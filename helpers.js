const fs = require("fs/promises");
const path = require("path");

//GENERATE ERROR

const generateError = (msg, status) => {
  const err = new Error(msg);
  err.statusCode = status;
  return err;
};

//CREAR CARPETA

const newFolder = async (folderName) => {
  const root = path.join(__dirname, process.env.ROOT);
  const userFolder = path.join(__dirname, process.env.ROOT, folderName);
  //Comprobamos que exista la carpeta raiz.
  try {
    //Intentamos acceder al directoiro de subida de archivos mediante access.
    await fs.access(root);
  } catch {
    //Si no es posible acceder al directorio lanzara un error y creamos el directorio
    await fs.mkdir(root);
  }

  try {
    await fs.access(userFolder);
  } catch (error) {
    await fs.mkdir(userFolder);
  }
};

// Guardar archivo

const saveFile = async (file, username) => {
  const uploadsPath = path.join(__dirname, process.env.ROOT, username);
  await file.toFile(uploadsPath);
};

module.exports = { generateError, newFolder, saveFile };
