const BlogModel = require("../../models/blog.model");

const router = require("express").Router();

/* GET blogs  page, i.e. list of all blogs*/
router.get("/blogs", (req, res, next) => {
  BlogModel.find()
    .then((blogs) => {
      res.render("blogs/index.hbs", { blogs });
    })
    .catch((err) => {
      console.log("blogs fetch failed", err);
    });
});

//get each blog detail page

router.get("/blog/:id", (req, res, next) => {
  const { id } = req.params;
  //console.log("errrrrrrrrrrrr" + id);
  BlogModel.findById(id.trim())
    .then((blog) => {
      res.render("blogs/blogPost.hbs", { blog });
      console.log("Blog fetched", res);
    })
    .catch((err) => {
      console.log("Blog fetch failed", err);
    });
});

module.exports = router;
