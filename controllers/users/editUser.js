const updateUserInfoQuery = require("../../bbdd/queries/users/updateUserInfoQuery");
const fs = require("fs/promises");
const path = require("path");
const selectUserByEmailQuery = require("../../bbdd/queries/users/selectUserByEmailQuery");
const { v4: uuidv4 } = require("uuid");

const editUser = async (req, res, next) => {
  try {
    const user = req.user;
    let { newUserName, newBio } = req.body;
    let actualInfo = await selectUserByEmailQuery(user.email);

    let bioQuery;
    let extension;
    let photoName;

    if (!newBio) {
      bioQuery = actualInfo.bio;
    } else {
      bioQuery = newBio;
    }

    if (req.files) {
      let photo;
      let newPhoto;
      photoName = uuidv4();
      extension = req.files.file.name.split(".");

      newPhoto = path.join(
        `${__dirname}../../../profilePhotos/${photoName}.${extension[1]}`
      );
      photo = req.files.file;
      photoName = photoName + "." + extension[1];

      photo.mv(newPhoto, (err) => {
        if (err) console.log("ERROR: " + err);
      });

      if (actualInfo.photo != null) {
        const oldPhoto = path.join(
          __dirname,
          "../../",
          "profilePhotos",
          actualInfo.photo
        );
        //Eliminamos la foto del disco
        fs.unlink(oldPhoto, function (err) {
          if (err) return console.err(err);
        });
      }
    } else if (!req.files) {
      photoName = actualInfo.photo;
    }

    if (!newUserName) {
      newUserName = actualInfo.username;
    }
    console.log(photoName);
    //Tratamos de obtener al usuario con el ID que venga de Auth
    await updateUserInfoQuery(newUserName, photoName, bioQuery, actualInfo.id);

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
