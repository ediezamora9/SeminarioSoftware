const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;

  bcrypt
    .hash(password, 12)
    .then((hashedPass) => {
      const user = new User({
        username: username,
        password: hashedPass,
        role: role
      });

      return user.save();
    })
    .then(() => {
      res.status(201).json({ message: "Usuario Creado" });
    })
    .catch((e) => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
};

exports.login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let loadedUser;

  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        const error = new Error("El usuario no existe");
        error.statusCode = 401;
        throw error;
      } else {
        loadedUser = user;
        return bcrypt.compare(password, user.password);
      }
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Contraseña Erronea");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign({
        username: loadedUser.username,
        userID: loadedUser._id.toString(),
      }, process.env.JWTSECRET);
      res.status(200).json({token: token, userID: loadedUser._id.toString(), role: loadedUser.role})
    })
    .catch((e) => {
      if (!e.statusCode) {
        err.statusCode = 500;
      }
      next(e);
    });
};
