const router = require("express").Router();
const { User } = require("../models");

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
      order: [["name", "ASC"]],
    });

    blogList = await gitRequest.homepageList(8);
    blogList = { list: blogList };
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
        blogList,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/search", async (req, res) => {
  res.render("search");
});
router.get("/search", async (req, res) => {
  res.render("search");
});

User.findOne({
  // Gets the past blog based on the search terms given in the request parameters
  where: {
    name: req.params.name,
  },
})
  .then((nameData) => {
    res.json(nameData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });

module.exports = router;
