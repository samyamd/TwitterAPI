// const express = require("express");
const multer = require("multer");
const Tweet = require("../model/tweetModel");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/tweets/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/gif" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/jpg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(new Error("Upload Image File Only"), false);
//   }
// };

var upload = multer({ storage: storage });
exports.uploadImage = upload.single("image");

exports.allTweets = async (req, res, next) => {
  const tweets = await Tweet.find();
  try {
    res.status(200).json({
      status: "Success",
      //   requestTime: req.requestTime,
      result: tweets.length,
      data: tweets
    });
  } catch (error) {
    res.status(500).json({
      status: "Failure",
      responseTime: req.requestTime,
      message: error
    });
  }
};

exports.addTweet = (req, res, next) => {
    // console.log(data);
    // console.log(req.file.filename);
    // console.log(req.body);
    
    // res.status(201).json({
    //     status:"success"
    // })
    const tweet = new Tweet({
      username: req.body.username,
      tweet: req.body.tweet,
      image: req.file.filename
    });
    tweet
      .save()
      .then(
        res.status(201).json({
          status: "Tweet Posted successfully!",
          tweet,
        //   token: token,
        //   request: {
        //     type: "GET",
        //     url: `http://localhost/user/${user.username}`
        //   }
      })
      )
      .catch(err => console.log(err));
};

exports.allTweets = async (req,res,next)=> {
  const tweet = await Tweet.find();
  try {
    res.status(200).send(tweet);
  } catch (error) {
    res.status(200).json({
      status: "Failure",
      responseTime: req.requestTime,
      message: error
    });
  }
}
