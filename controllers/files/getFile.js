const getFileById = require("../../bbdd/queries/files/getFileByIdQuery");

const path = require("path");
const fs = require("fs");

const getFile = async (req, res, next) => {
  try {
    const user = req.user;
    const { fileId, folder } = req.params;

    const fileName = await getFileById(fileId, user.id);
    console.log(fileName);
    let downloadPath;

    if (!folder) {
      downloadPath = path.join(
        __dirname,
        "../../",
        process.env.ROOT,
        user.id,
        fileName.name
      );
    } else {
      downloadPath = path.join(
        __dirname,
        "../../",
        process.env.ROOT,
        user.id,
        folder,
        fileName.name
      );
    }

    //Comprobamos que existe el archivo en root
    fs.open(downloadPath, "r", function (err, f) {
      if (err) {
        console.error("File not found");
        res.status(404).send({
          message: "File not found",
        });
      } else {
        res.download(downloadPath, () => {});
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getFile;
