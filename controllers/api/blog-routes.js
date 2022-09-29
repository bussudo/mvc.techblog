const router = require("express").Router();
const { Blog } = require("../../models");
const fs = require("fs");

router.get("/", async (req, res) => {
  const blog = await Blog.findAll({ raw: true });
  console.log("blog", blog);
  res.json(blog);
});

router.post("/", async (req, res) => {
  const body = req.body;
  body.user_id = req.session.userId;
  try {
    const dbBlogData = await Blog.create(body);
    req.session.save(() => {
      res.status(200).json(dbBlogData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
