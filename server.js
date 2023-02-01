require("dotenv").config();
const { newProfileFolder } = require("./helpers");
const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const isAuth = require("./middlewares/isAuth");
const cors = require("cors");

const app = express();

//CORS PARA OPENAPI
app.use(
  cors({
    origin: "*",
  })
);

//MW Leer body
app.use(express.json());

//MW LEER FORM DATA CON LIMITE DE 50 MB PARA LOS ARCHIVOS
app.use(
  fileUpload({
    limits: {
      fileSize: 52428800,
    },
    abortOnLimit: true,
  })
);

//MW Morgan
app.use(morgan("dev"));

newProfileFolder();

/**
 * ###############################
 * ## Controladores Users       ##
 * ###############################
 */
const { newUser, loginUser, editUser } = require("./controllers/users/index");

//Ruta para nuevo usuario
app.post("/users", newUser);

//Ruta para login de usuario
app.post("/users/login", loginUser);

//Ruta para editar usuario
app.patch("/users/edit", isAuth, editUser);

/**
 * ###############################
 * ## Controladores Files       ##
 * ###############################
 */
const {
  newFile,
  listFiles,
  getFile,
  removeFile,
  createFolder,
  removeFolder,
} = require("./controllers/files/index");

//Ruta para subir un archivo
app.post("/files", isAuth, newFile);

//Ruta para listar todos los archivos de un usuario
app.get("/files", isAuth, listFiles);

//Ruta para descargar un archivo
app.get("/files/:fileId", isAuth, getFile);

//Ruta para descargar archivo en folder
app.get("/files/:folder/:fileId", isAuth, getFile);

//Ruta para borrar archivo en raiz
app.delete("/files/:fileId/", isAuth, removeFile);

//Ruta para crear una carpeta
app.post("/folder", isAuth, createFolder);

//Ruta para borrar una carpeta Y su contenido
app.delete("/folder/:folderName", isAuth, removeFolder);

/**
 * ###############################
 * ##     MW Error / 404        ##
 * ###############################
 */

//MW ERROR
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send({
    status: "Error",
    message: err.message,
  });
});
//MW 404
app.use((req, res) => {
  res.status(404).send({
    message: "Invalid Path",
  });
});

app.listen(process.env.PORT, () => {
  console.info(`Server listening at ${process.env.PORT}`);
});
