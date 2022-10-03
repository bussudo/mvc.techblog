const router = require("express").Router();
const { User } = require("../../models");
const fs = require("fs");

// CREATE new user

router.get("/", async (req, res) => {
  const users = await User.findAll({ raw: true });
  // console.log("users", users);
  res.json(users);
});

router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      firstName: req.body.fName,
      lastName: req.body.lName,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id;
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedUserData = await User.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(updatedUserData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      // console.log("No user found");
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id;
      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post("/image/:id", (req, res) => {
  const id = req.params.id;
  const image = req.body.newImg;
  const data = image.data.replace(/^data:image\/(.+);base64,/, "");
  const type = image.type;
  fs.writeFile(
    `./public/images/uploads/profile-${id}.jpg`,
    data,
    "base64",
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
});

module.exports = router;
