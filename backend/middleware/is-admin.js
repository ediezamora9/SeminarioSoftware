const userController = require('../controllers/user');

module.exports = async (req, res, next) => {
  const userID = req.userID;
  const user = await userController.getUserByID(userID);

  console.log(user.role);
  if(user.role != "admin") {
    res.status(401).json({"error":"no tienes permiso para acceder aquí"});
  }

  next();
};