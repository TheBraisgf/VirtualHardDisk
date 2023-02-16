const path = require("path");
const fs = require("fs");

const selectAllFilesQuery = require("../../bbdd/queries/files/selectAllFilesQuery");

const listFiles = async (req, res, next) => {
  try {
    const user = req.user;

    const filesQuery = await selectAllFilesQuery(user.id);

    const directoryPath = path.join(
      __dirname + "../" + "../" + "../" + "root/" + user.id
    );

    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }

      let items = [];

      // Agregamos los archivos de la query filesQuery
      filesQuery.forEach((file) => {
        const item = {
          id: file.id,
          name: file.name,
          type: "file",
          extension: file.extension,
          parentId: file.folder,
          isDir: false,
        };
        items.push(item);
      });

      // Agregamos las carpetas del directorio
      files.forEach((file) => {
        const filePath = path.join(directoryPath, file);
        const isDirectory = fs.statSync(filePath).isDirectory();
        if (isDirectory) {
          const item = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            name: file,
            type: "folder",
            isDir: true,
          };
          items.push(item);
        }
      });

      // console.log("Items dentro de la función:", items);

      res.status(200).send({
        data: {
          items,
        },
      });
    });
  } catch (err) {
    next(err);
  }
};

module.exports = listFiles;
