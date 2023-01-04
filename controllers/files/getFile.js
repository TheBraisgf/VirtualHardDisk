const getFileById = require("../../bbdd/queries/files/getFileByIdQuery");
const path = require("path");
const fs = require("fs");

const getFile = async (req, res, next) => {
  try {
    const user = req.user;
    const { idFile, folder } = req.params;

    const fileName = await getFileById(idFile, user.id);
    let downloadPath;

    if (!folder) {
      downloadPath = path.join(
        __dirname,
        "../../",
        process.env.ROOT,
        user.username,
        fileName.name
      );
    } else {
      downloadPath = path.join(
        __dirname,
        "../../",
        process.env.ROOT,
        user.username,
        folder,
        fileName.name
      );
    }

    console.log(downloadPath);

    //Comprobamos que existe el archivo en root
    fs.open(downloadPath, "r", function (err, f) {
      if (err) {
        console.error("File no exists");
        res.status(404).send({
          message: "File no exists",
        });
      } else {
        console.log("Found File!!");
        res.download(downloadPath, () => {
          console.log("Download completed");
        });
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getFile;
