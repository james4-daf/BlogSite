const BlogModel = require("../../models/blog.model");

const router = require("express").Router();

/* GET celebrity page page */
router.get("/blogs", (req, res, next) => {
  BlogModel.find()
    .then((blogs) => {
      res.render("blogs/index.hbs", { blogs });
    })
    .catch((err) => {
      console.log("blogs fetch failed", err);
    });
});

module.exports = router;
