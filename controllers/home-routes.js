const router = require("express").Router();
const { User, Blog } = require("../models");

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
  try {
    const userData = await User.findAll({
      raw: true,
      attributes: { exclude: ["password"] },
      order: [["email", "ASC"]],
    });

    // blogList = await blogRequest.homepageList(8);
    // blogList = { list: blogList };
    console.log("userData", userData);
    req.session.save(() => {
      if (req.session.countVisit) {
        req.session.countVisit++;
      } else {
        req.session.countVisit = 1;
      }
      res.render("homepage", {
        userData,
        userId: req.session.userId,
        loggedIn: req.session.loggedIn,
        countVisit: req.session.countVisit,
      });
    });
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
  console.log(req.session.userId);
  Blog.findAll({
    where: {
      user_id: req.session.userId,
    },
  }).then((blogdata) => {
    blogdata = blogdata.map((blog) => blog.get({ plain: true }));

    console.log(blogdata);
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
      console.log(userData);
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
  try {
    let blogEdit = await Blog.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!blogEdit) {
      res.status(400).json("blog not found");
    }
    console.log(blogEdit);
    blogEdit = blogEdit.get({
      plain: true,
    });

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
module.exports = router;
