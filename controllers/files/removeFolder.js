const path = require("path");
const fs = require("fs");
const selectUserById = require("../../bbdd/queries/users/selectUserByIdQuery");

const removeFolder = async (req, res, next) => {
  const user = req.user;
  const { removeFolderName } = req.body;

  let userId = await selectUserById(user.id);
  console.log(userId);
  const removeFolderPath = path.join(
    __dirname,
    "../../",
    process.env.ROOT,
    userId.username,
    removeFolderName
  );
  console.log(removeFolderPath);
  fs.rmSync(removeFolderPath, { recursive: true, force: true });

  res.send({
    message: "Folder Deleted",
  });
};

module.exports = removeFolder;
