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

router.get("/blogs/create", (req, res, next) => {
  BlogModel.create()
    .then(() => {
      res.render("blogs/newblogPost.hbs");
      console.log("Blogs fetched", res);
    })
    .catch((err) => {
      console.log("Blog create failed", err);
    });
});

router.post("/blogs/create", (req, res, next) => {
  const { title, problemStatement, solution, mdnDocs, tags } = req.body;
  BlogModel.create({
    title,
    problemStatement,
    solution,
    mdnDocs,
    tags,
  })
    .then(() => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log("blog creating failed", err);
    });
});

//{tags : {$regex : "javascript"}}

module.exports = router;
