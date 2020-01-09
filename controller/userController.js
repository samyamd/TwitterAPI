const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../model/userModel");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/users/");
  },
  filename: (req, file, cb) => {
    var imagename = Date.now() + file.originalname;
    var filetype = "";
    if (
      file.mimetype === "image/gif" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, imagename);
      // filetype = "gif";
    } else {
      cb();
    }
    // if () {
    //   filetype = "png";
    // }
    // if () {
    //   filetype = "jpg";
    // }
  }
});

var upload = multer({ storage: storage });

exports.uploadProfile = upload.single("image");

// const auth = require('../auth')

exports.getRegister = async (req, res, next) => {
  const user = await User.find();
  try {
    res.status(200).send(user);
  } catch (error) {
    res.status(200).json({
      status: "Failure",
      responseTime: req.requestTime,
      message: error
    });
  }
};

exports.registerUser = (req, res, next) => {
  let password = req.body.password;
  bcrypt.hash(password, 10, function(err, hash) {
    if (err) {
      let err = new Error();
      err.status = 500;
      return next(err);
    }
    // console.log(req.file.filename);
    // let imagefile;
    // if(req.file){
    //   imagefile = `image: ${req.file.filename}`
    // }
    // else{
    //   imagefile = ""
    // }
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      // phone: req.body.phone,
      username: req.body.username,
      image: req.body.image,
      password: hash
    });
    user
      .save()
      .then(user => {
        let token = jwt.sign({ _id: user._id }, process.env.TOKEN);
        res.status(201).json({
          status: "Registration success!",
          user,
          token: token,
          request: {
            type: "GET",
            url: `http://localhost/user/${user.username}`
          }
        });
      })
      .catch(err => console.log(err));
  });
};

// exports.showUser = (req, res, next) => {
//   const user = User.findOne({ username: req.params.username });
//   user
//     .select("-_id name username email phone profile_picture")
//     .then(user => {
//       res.status(200).send(user);
//     });
// };

exports.me = (req,res,next) => {
  res.send(req.user)
}

exports.updateUser = (req, res, next) => {
  res.status(201).json({
    message: "Update Done"
  });
};
exports.deleteUser = (req, res, next) => {
  res.status(201).json({
    message: "Update Done"
  });
};

exports.loginUser = (req, res, next) => {
  User.findOne({$or: [{username: req.body.username} , {email: req.body.email}] })
    .then(user => {
      if (user == null) {
        let err = new Error("User not found!");
        err.status = 401;
        return next(err);
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              let err = new Error("Incorrect Password!");
              err.status = 401;
              return next(err);
            }
            let token = jwt.sign(
              { username: user.username, _id: user._id },
              process.env.TOKEN,
              {expiresIn: "1h"}
            );
            res.json({
              status: "Successful",
              token: token,
              request: {
                type: "GET",
                url: `localhost:3000/user/${user.username}`
              }
            });
          })
          .catch(next);
      }
    })
    .catch(next);
};

exports.checkUser = (req,res,next) =>{
    User.findOne({$or: [{ email: req.body.email } , { username: req.body.username }]})
        .then((user) => {
            if (user == null) {
                res.json({ status: "OK" });

            } else {
                res.json({ status: "BAD" });
            }
        }

        )
}