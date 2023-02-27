const getFileById = require("../../bbdd/queries/files/getFileByIdQuery");
const path = require("path");
const fs = require("fs");
const removeElementByIdQuery = require("../../bbdd/queries/files/removeElementByIdQuery");
const selectUserById = require("../../bbdd/queries/users/selectUserByIdQuery");

const removeFile = async (req, res, next) => {
  try {
    const user = req.user;
    const { fileId } = req.params;
    let { folderName } = req.body;

    const fileName = await getFileById(fileId, user.id);
    if (folderName === "Home") {
      try {
        const removePath = path.join(
          __dirname,
          "../../",
          process.env.ROOT,
          user.id,
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
            fs.unlink(removePath, function (err) {
              if (err) return console.err(err);
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
        user.id,
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
          //Quitamos del disco
          fs.unlink(removePath, function (err) {
            if (err) return console.err(err);
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
