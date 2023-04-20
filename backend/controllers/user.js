const User = require('../models/user');

exports.getUserByID = async (userID) => {
  let user;
  try {
    user = await User.findById(userID);
  }
  catch(e) {
    throw(e);
  }

  if(user) {
    return user;
  }
}

exports.getAllUsers = async (req, res, next) => {
  let user;

  try {
    user = await User.find().sort({username:'asc'});
  }
  catch (e) {
    res.status(500).jsson({"error":"hubo un error"});
  }

  res.status(200).json(user);
};

exports.deleteUser = async (req, res, next) => {
  const userID = req.body.userID; 

  try {
    await User.findByIdAndRemove(userID);
  }
  catch (e) {
    res.status(500).jsson({"error":"no se pudo eliminar el usuario"});
  }

  res.status(200).json({"mensaje":"usuario eliminado correctamente"});
};