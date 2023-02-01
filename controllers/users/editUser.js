const updateUserInfoQuery = require("../../bbdd/queries/users/updateUserInfoQuery");
const fs = require("fs/promises");
const path = require("path");
const selectUserByEmailQuery = require("../../bbdd/queries/users/selectUserByEmailQuery");
const { v4: uuidv4 } = require("uuid");

const editUser = async (req, res, next) => {
  try {
    const user = req.user;
    let { username, bio } = req.body;
    let actualInfo = await selectUserByEmailQuery(user.email);

    let photo;
    let newPhoto;
    let photoName = uuidv4();
    let bioQuery;
    let extension = req.files.photo.name.split(".");

    if (!bio) {
      bioQuery = actualInfo.bio;
    } else {
      bioQuery = bio;
    }

    const oldPhoto = path.join(
      __dirname,
      "../../",
      "profilePhotos",
      actualInfo.photo
    );
    if (!req.files) {
      photoName = actualInfo.photo;
    } else {
      newPhoto = path.join(
        `${__dirname}../../../profilePhotos/${photoName}.${extension[1]}`
      );
      photo = req.files.photo;

      photo.mv(newPhoto, (err) => {
        if (err) console.log("ERROR: " + err);
      });

      if (actualInfo.photo != "photo") {
        //Eliminamos la foto del disco
        fs.unlink(oldPhoto, function (err) {
          if (err) return console.err(err);
        });
      }
    }

    if (!username) {
      username = actualInfo.username;
    }

    //Tratamos de obtener al usuario con el ID que venga de Auth
    await updateUserInfoQuery(username, photoName, bioQuery, actualInfo.id);

    //GUARDAR LA FOTO EN DISCO
    //Comprobamos que exista folder de fotos de perfil.

    res.status(200).send({
      message: "User Updated",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = editUser;
