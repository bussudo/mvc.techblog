const router = require("express").Router();
const blogRoutes = require("./blog-routes");
const userRoutes = require("./user-routes");
// const commentRoutes = require("./comment-routes");

router.use("/users", userRoutes);
router.use("/blogs", blogRoutes);
// router.use("/comments", comments);
module.exports = router;
