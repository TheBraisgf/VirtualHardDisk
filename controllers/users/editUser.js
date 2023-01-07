const updateUserInfoQuery = require("../../bbdd/queries/users/updateUserInfoQuery");
const { generateError } = require("../../helpers");
const fs = require("fs/promises");
const path = require("path");
const selectUserByEmailQuery = require("../../bbdd/queries/users/selectUserByEmailQuery");

const editUser = async (req, res, next) => {
  try {
    const user = req.user;
    let { username, bio } = req.body;
    let actualInfo = await selectUserByEmailQuery(user.email);

    let photo;
    let newPhoto;
    let photoName;
    let bioQuery;

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
        __dirname,
        "../../",
        "profilePhotos",
        req.files.photo.name
      );
      photo = req.files.photo;
      photoName = req.files.photo.name;

      photo.mv(newPhoto, (err) => {
        if (err) console.log("ERROR: " + err);
      });

      if (actualInfo.photo === "photo") {
        console.log("Old Photo");
      } else {
        //Eliminamos lafoto del disco
        fs.unlink(oldPhoto, function (err) {
          if (err) return console.log(err);
        });
      }
    }

    if (!username) {
      username = actualInfo.username;
    }

    //CAMBIAR EL NOMBRE DE LA CARPETA DE USUARIO
    const currPath = path.join(
      __dirname,
      "../../",
      process.env.ROOT,
      actualInfo.username
    );
    const newPath = path.join(__dirname, "../../", process.env.ROOT, username);
    fs.rename(currPath, newPath, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully renamed the directory.");
      }
    });

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
