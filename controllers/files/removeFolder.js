const path = require("path");
const fs = require("fs");
const selectUserById = require("../../bbdd/queries/users/selectUserByIdQuery");
const { generateError } = require("../../helpers");

const removeFolder = async (req, res, next) => {
  const user = req.user;
  const { removeFolderName } = req.body;

  let userId = await selectUserById(user.id);
  const removeFolderPath = path.join(
    __dirname,
    "../../",
    process.env.ROOT,
    userId.username,
    removeFolderName
  );

  try {
    fs.rmdirSync(removeFolderPath, { recursive: true, force: true });
    res.send({
      message: "Folder Deleted",
    });
  } catch (err) {
    res.send({
      message: "Folder No Exists",
    });
  }
};

module.exports = removeFolder;
