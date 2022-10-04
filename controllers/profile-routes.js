const router = require("express").Router();
const { User } = require("../models");
//const gitRequest = require("../utils/github.js");
// const blogRequest = require("../utils/blog.js");
const fs = require("fs");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  userData = await User.findByPk(id, { raw: true });
  console.log(req.session.userId);
  //githubList = await gitRequest(req.session.userId, 30);
  blogList = await blogRequest(req.session.userId, 30);
  res.render("profile", {
    userData,
    loggedIn: req.session.loggedIn,
    userId: req.session.userId,
    //githubList,
    blogList,
  });
});

module.exports = router;
