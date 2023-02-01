const path = require("path");
const fs = require("fs");
const selectUserById = require("../../bbdd/queries/users/selectUserByIdQuery");

const removeFolder = async (req, res, next) => {
  const user = req.user;
  const { folderName } = req.params;

  const removeFolderPath = path.join(
    __dirname,
    "../../",
    process.env.ROOT,
    user.id,
    folderName
  );

  try {
    fs.rmdirSync(removeFolderPath, { recursive: true, force: true });
    res.send({
      message: "Folder Deleted",
    });
  } catch (err) {
    res.status(404).send({
      message: "Folder not found",
    });
  }
};

module.exports = removeFolder;
