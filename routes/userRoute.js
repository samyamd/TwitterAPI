const express = require("express");
const user = require("../controller/userController");
const auth = require("../middleware/auth");

var router = express.Router();

router
  .route("/register")
  .get(user.getRegister)
  .post(user.registerUser);

router.post("/upload", user.uploadProfile,(req,res)=>{
  console.log(req.file.filename)
  res.json(req.file)
});

router
  .route("/login")
  .get((req, res, next) => {
    res.status(200).json({ message: "LOGIN PAGE" });
  })
  .post(user.loginUser);

router.route("/me").get(auth.verifyUser, user.me);
router.post("/check", user.checkUser);
// .patch(auth.verifySingleUser,user.updateUser)
// .delete(auth.verifySingleUser,user.deleteUser);

module.exports = router;
