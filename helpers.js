const fs = require("fs/promises");
const path = require("path");

//GENERATE ERROR

const generateError = (msg, status) => {
  const err = new Error(msg);
  err.statusCode = status;
  return err;
};

//CREAR CARPETA

const newProfileFolder = async () => {
  const profileFolder = path.join(__dirname, "profilePhotos");
  //Comprobamos que exista la carpeta raiz.
  try {
    //Intentamos acceder al directoiro de subida de archivos mediante access.
    await fs.access(profileFolder);
  } catch {
    //Si no es posible acceder al directorio lanzara un error y creamos el directorio
    await fs.mkdir(profileFolder);
  }
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
  } catch {
    await fs.mkdir(userFolder);
  }
};

// Guardar archivo EN USERNAME

const saveFile = async (file, username, folder) => {
  console.log(folder);
  if (!folder) {
    const fileName = file.name;
    const uploadsPath = path.join(
      __dirname,
      process.env.ROOT,
      username.username,
      fileName
    );

    //Comprobamos que exista el archivo.
    try {
      //Intentamos acceder al directorio.
      await fs.access(uploadsPath);
      return true;
    } catch {
      file.mv(uploadsPath, (err) => {
        if (err) console.log("ERROR: " + err);
      });
      return false;
    }
  }

  //SI EL USUARIO ESPECIFICA UNA CARPETA
  else {
    const fileName = file.name;
    const folderPath = path.join(
      __dirname,
      process.env.ROOT,
      username.username,
      folder
    );
    const uploadsPath = path.join(
      __dirname,
      process.env.ROOT,
      username.username,
      folder,
      fileName
    );

    //Comprobamos que exista la carpeta NEWFOLDERNAME.
    try {
      //Intentamos acceder al directorio.
      await fs.access(folderPath);
    } catch {
      //Si no es posible acceder al directorio lanzara un error y creamos el directorio
      await fs.mkdir(folderPath, (err) => {
        if (err) {
          return console.error(err);
        }
      });
    }

    //Comprobamos que exista el archivo.
    try {
      //Intentamos acceder al directorio.
      await fs.access(uploadsPath);
      return true;
    } catch {
      file.mv(uploadsPath, (err) => {
        if (err) console.log("ERROR: " + err);
      });
      return false;
    }
  }
};

//////////////////////////////////////
const newPersonalizedFolder = async (username, folder) => {
  const newFolderPath = path.join(
    __dirname,
    "../../",
    process.env.ROOT,
    username,
    folder
  );

  //Comprobamos que exista la carpeta NEWFOLDERNAME.
  try {
    //Intentamos acceder al directorio.
    await fs.access(newFolderPath);
  } catch {
    //Si no es posible acceder al directorio lanzara un error y creamos el directorio
    await fs.mkdir(newFolderPath, (err) => {
      if (err) {
        return console.error(err);
      }
    });
  }
};

module.exports = {
  generateError,
  newFolder,
  saveFile,
  newPersonalizedFolder,
  newProfileFolder,
};
