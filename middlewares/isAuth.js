const jwt = require("jsonwebtoken");
const { generateError } = require("../helpers");

const isAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw generateError("Missing authorization", 400);
    }

    //Variable donde almacenaremos la info del token descriptado
    let tokenInfo;

    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET);
    } catch (err) {
      throw generateError("Invalid token", 401);
    }

    req.user = tokenInfo;
    console.log(req.user);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = isAuth;
