const getFileById = require("../../bbdd/queries/files/getFileByIdQuery");
const path = require("path");
const fs = require("fs");
const removeElementByIdQuery = require("../../bbdd/queries/files/removeElementByIdQuery");
const selectUserById = require("../../bbdd/queries/users/selectUserByIdQuery");

const removeFile = async (req, res, next) => {
  try {
    const user = req.user;
    const { fileId } = req.params;
    const { folderName } = req.body;
    const username = await selectUserById(user.id);

    const fileName = await getFileById(fileId, user.id);
    if (!folderName) {
      try {
        const removePath = path.join(
          __dirname,
          "../../",
          process.env.ROOT,
          username.username,
          fileName.name
        );

        //Comprobamos que existe el archivo en root
        fs.open(removePath, "r", function (err, f) {
          if (err) {
            console.error("File not found");
            res.status(404).send({
              message: "File not found",
            });
          } else {
            console.log("Found File!!");

            fs.unlink(removePath, function (err) {
              if (err) return console.err(err);
              console.log("file deleted successfully");
            });

            //Hacemos el borrado logico de la BBDD
            removeElementByIdQuery(fileId, user.id);

            res.status(200).send({
              message: "Remove completed",
            });
          }
        });
      } catch (err) {
        next(err);
      }
    }

    //CUANDO NOS PASAN UNA CARPETA
    else {
      const removePath = path.join(
        __dirname,
        "../../",
        process.env.ROOT,
        username.username,
        folderName,
        fileName.name
      );

      //Comprobamos que existe el archivo en root
      fs.open(removePath, "r", function (err, f) {
        if (err) {
          console.error("File not found");
          res.status(404).send({
            message: "File not found",
          });
        } else {
          console.log("Found File!!");

          //Quitamos del disco
          fs.unlink(removePath, function (err) {
            if (err) return console.err(err);
            console.log("file deleted successfully");
          });
          //Hacemos el borrado logico de la BBDD
          removeElementByIdQuery(fileId, user.id);
          res.status(200).send({
            message: "Remove completed",
          });
        }
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = removeFile;
