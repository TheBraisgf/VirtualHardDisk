const selectAllFilesQuery = require("../../bbdd/queries/files/selectAllFilesQuery");

const listFiles = async (req, res, next) => {
  try {
    const user = req.user;

    const files = await selectAllFilesQuery(user.id);

    res.status(200).send({
      data: {
        files,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = listFiles;
