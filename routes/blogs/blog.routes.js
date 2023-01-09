const BlogModel = require("../../models/blog.model");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index.hbs");
});

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
//filtered posts
router.get("/:filter", (req, res, next) => {
  const { filter } = req.params;

  let capitalized = filter.charAt(0).toUpperCase() + filter.slice(1);

  BlogModel.find({ tags: { $regex: capitalized } })
    .then((filteredBlog) => {
      res.render("blogs/filterPosts.hbs", {
        filteredBlog,
        isArray: filter == "arrays",
        isFunctions: filter == "functions",
        isString: filter == "strings",
      });
      console.log("Blog fetched", res);
    })
    .catch((err) => {
      console.log("Blog fetch failed", err);
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

router.get("/blog/:id/edit", (req, res, next) => {
  const { id } = req.params;
  BlogModel.findById(id)
    .then((blog) => {
      res.render("blogs/editBlogPost.hbs", { blog });
    })
    .catch((err) => {
      console.log("blog edit failed", err);
    });
});

router.post("/blog/:id/edit", (req, res, next) => {
  const { title, problemStatement, solution, mdnDocs, tags } = req.body;
  const { id } = req.params;
  BlogModel.findByIdAndUpdate(id, {
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
      console.log("blog update failed", err);
    });
});

router.post("/blog/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  const { id } = req.params;
  BlogModel.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log("blog Delete failed", err);
    });
});

//{tags : {$regex : "javascript"}}

module.exports = router;
