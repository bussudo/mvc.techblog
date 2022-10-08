const router = require("express").Router();
const { User, Comment } = require("../../models");

router.post("/:id", async (req, res) => {
  try {
    const commentData = await Comment.create({
      comment: req.body.comment,
      blog_id: req.params.id,
      user_id: req.session.userId,
    });
    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.put("/id", async (req, res) => {
  try {
    const updateComment = Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id" });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
