const express = require("express");
const user = require("../controller/userController");
const auth = require("../middleware/auth");

var router = express.Router();

router
  .route("/register")
  .get(user.getRegister)
  .post(user.registerUser);

router.post("/upload", user.uploadProfile);

router
  .route("/login")
  .get((req, res, next) => {
    res.status(200).json({ message: "LOGIN PAGE" });
  })
  .post(user.loginUser);

router.route("/me").get(auth.verifyUser, user.me);
// .patch(auth.verifySingleUser,user.updateUser)
// .delete(auth.verifySingleUser,user.deleteUser);

module.exports = router;
