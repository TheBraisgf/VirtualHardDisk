const updateUserInfoQuery = require("../../bbdd/queries/users/updateUserInfoQuery");
const { generateError } = require("../../helpers");
const fs = require("fs/promises");
const path = require("path");

const editUser = async (req, res, next) => {
  try {
    const user = req.user;
    let { username, bio } = req.body;
    let photo = req.files.photo;

    if (!username) {
      username = user.username;
    }
    if (!req.files?.photo) {
      photo = user.photo;
    }
    if (!bio) {
      bio = user.bio;
    }
    //Tratamos de obtener al usuario con el ID que venga de Auth
    await updateUserInfoQuery(username, photo.name, bio, user.id);

    //GUARDAR LA FOTO EN DISCO
    //Comprobamos que exista folder de fotos de perfil.
    const profileFolder = path.join(
      __dirname,
      "../../",
      "profilePhotos",
      photo.name
    );
    console.log(profileFolder);

    photo.mv(profileFolder, (err) => {
      if (err) console.log("ERROR: " + err);
    });

    res.status(200).send({
      message: "User Updated",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = editUser;
