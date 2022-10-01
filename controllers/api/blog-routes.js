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
router.put("/:id", async (req, res) => {
  try {
    const updateBlog = Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateBlog) {
      res.status(404).json("could not find blog");
    }
    res.status(200).json(updateBlog);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.delete("/:id", async (req, res) => {
  console.log(req.params);
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: "No blog found with this id!" });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
