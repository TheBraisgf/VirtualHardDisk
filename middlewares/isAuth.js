const jwt = require("jsonwebtoken");
const { generateError } = require("../helpers");

const isAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw generateError("Missing authorization", 400);
    }

    const token = authorization.split(" ")[1];
    //Variable donde almacenaremos la info del token descriptado
    let tokenInfo;

    try {
      tokenInfo = jwt.verify(token, process.env.SECRET);
    } catch (err) {
      throw generateError("Invalid token", 401);
    }

    req.user = tokenInfo;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = isAuth;
