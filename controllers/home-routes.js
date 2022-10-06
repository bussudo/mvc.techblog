const router = require("express").Router();
const { User, Blog, Comment } = require("../models");

router.get("/createBlog", (req, res) => {
  res.render("createBlog");
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/", async (req, res) => {
  console.log("inside the home routes *****************************");
  try {
    const blogData = await Blog.findAll({
      raw: true,
    });

    // blogList = await blogRequest.homepageList(8);
    // blogList = { list: blogList };
    console.log("blogData: ---------------------->>>>>>", blogData);
    res.render("homepage", { blogData, loggedIn: req.session.loggedIn });
  } catch (err) {
    g(err);
    res.status(500).json(err);
  }
});
router.get("/search", async (req, res) => {
  res.render("search");
});
router.get("/profile", async (req, res) => {
  res.render("profile");
});
router.get("/dashboard", async (req, res) => {
  // console.log(req.session.userId);
  Blog.findAll({
    where: {
      user_id: req.session.userId,
    },
  }).then((blogdata) => {
    blogdata = blogdata.map((blog) => blog.get({ plain: true }));

    // console.log(blogdata);
    res.render("dashboard", {
      blogdata,
      loggedIn: req.session.loggedIn,
    });
  });
});

router.get("/profile/:id", async (req, res) => {
  User.findOne({
    // Gets the past blog based on the search terms given in the request parameters
    where: {
      id: req.params.id,
    },
  })
    .then((userData) => {
      userData = userData.get({ plain: true });
      // console.log(userData);
      res.render("profile", {
        userData,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/blog/:id", async (req, res) => {
  // console.log("finding blog");
  // console.log(req.params.id);
  try {
    let blogEdit = await Blog.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!blogEdit) {
      res.status(400).json("blog not found");
    }
    // console.log(blogEdit);
    blogEdit = blogEdit.get({
      plain: true,
    });

    // console.log(blogEdit);
    res.render("editBlog", {
      blogEdit,
      loggedIn: req.session.loggedIn,
    });
    // req.status(200).json(blogEdit)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/comment/Blog/:id", async (req, res) => {
  try {
    let blogComment = await Blog.findOne({
      where: {
        id: req.params.id,
      },
      include: [User],
    });
    if (!blogComment) {
      res.status(400).json("blog not found");
    }

    blogComment = blogComment.get({
      plain: true,
    });
    console.log(blogComment);

    res.render("blogComment", {
      blogComment,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
