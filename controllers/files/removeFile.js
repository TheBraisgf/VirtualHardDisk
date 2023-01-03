const getFileById = require("../../bbdd/queries/files/getFileByIdQuery");
const path = require("path");
const fs = require("fs");

const removeFile = async (req, res, next) => {
  try {
    const user = req.user;
    const { idFile } = req.params;
    const { newFolderName } = req.body;

    const fileName = await getFileById(idFile, user.id);
    console.log(newFolderName);
    if (!newFolderName) {
      try {
        const removePath = path.join(
          __dirname,
          "../../",
          process.env.ROOT,
          user.username,
          fileName.name
        );

        console.log(removePath);

        //Comprobamos que existe el archivo en root
        fs.open(removePath, "r", function (err, f) {
          if (err) {
            console.error("File no exists");
            res.status(404).send({
              message: "File no exists",
            });
          } else {
            console.log("Found File!!");

            fs.unlink(removePath, function (err) {
              if (err) return console.log(err);
              console.log("file deleted successfully");
            });

            res.status(200).send({
              message: "Remove completed",
            });
          }
        });
      } catch (err) {
        next(err);
      }
    } else {
      const removePath = path.join(
        __dirname,
        "../../",
        process.env.ROOT,
        user.username,
        newFolderName,
        fileName.name
      );

      //Comprobamos que existe el archivo en root
      fs.open(removePath, "r", function (err, f) {
        if (err) {
          console.error("File no exists");
          res.status(404).send({
            message: "File no exists",
          });
        } else {
          console.log("Found File!!");

          fs.unlink(removePath, function (err) {
            if (err) return console.log(err);
            console.log("file deleted successfully");
          });

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
