const updateUserInfoQuery = require("../../bbdd/queries/users/updateUserInfoQuery");
const { generateError } = require("../../helpers");
const fs = require("fs/promises");
const path = require("path");
const selectUserByEmailQuery = require("../../bbdd/queries/users/selectUserByEmailQuery");

const editUser = async (req, res, next) => {
  try {
    const user = req.user;
    let { username, bio } = req.body;
    let photo = req.files.photo;

    console.log("USER INFO TOKEN:" + user);

    let actualInfo = await selectUserByEmailQuery(user.email);

    const newPhoto = path.join(
      __dirname,
      "../../",
      "profilePhotos",
      photo.name
    );
    console.log(user);
    const oldPhoto = path.join(
      __dirname,
      "../../",
      "profilePhotos",
      actualInfo.photo
    );

    if (!username) {
      username = actualInfo.username;
    }
    if (!req.files?.photo) {
      photo = actualInfo.photo;
    } else {
      if (actualInfo.photo === "photo") {
        console.log("Old Photo");
      } else {
        //Eliminamos lafoto del disco
        fs.unlink(oldPhoto, function (err) {
          if (err) return console.log(err);
        });
      }
    }

    //Tratamos de obtener al usuario con el ID que venga de Auth
    await updateUserInfoQuery(username, photo.name, bio, actualInfo.id);

    //GUARDAR LA FOTO EN DISCO
    //Comprobamos que exista folder de fotos de perfil.

    console.log(newPhoto);

    photo.mv(newPhoto, (err) => {
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
