const BlogModel = require("../../models/blog.model");

//cloudinary to hold images
const fileUploader = require("../../config/cloudinary.config");

const router = require("express").Router();

const { authMiddleware } = require("../../middleware");

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
      if (req.app.locals.loggedIn == true) {
        blog.showButtons = blog.userId == req.session.loggedInUser._id;
      }
      res.render("blogs/blogPost.hbs", { blog });
      console.log("Blog fetched", res);
    })
    .catch((err) => {
      console.log("Blog fetch failed", err);
    });
});

router.get("/blogs/create", authMiddleware, (req, res, next) => {
  BlogModel.create()
    .then(() => {
      res.render("blogs/newblogPost.hbs");
      console.log("Blogs fetched", res);
    })
    .catch((err) => {
      console.log("Blog create failed", err);
    });
});

router.post(
  "/blogs/create",
  authMiddleware,
  fileUploader.single("imageUrl"),
  (req, res, next) => {
    const { title, problemStatement, solution, mdnDocs, tags } = req.body;
    BlogModel.create({
      title,
      problemStatement,
      solution,
      imageUrl: req.file.path,
      mdnDocs,
      tags,
      userId: req.session.loggedInUser._id,
    })
      .then(() => {
        res.redirect("/blogs");
      })
      .catch((err) => {
        console.log("blog creating failed");
      });
  }
);

router.get("/blog/:id/edit", authMiddleware, (req, res, next) => {
  const { id } = req.params;
  BlogModel.findById(id)
    .then((blog) => {
      res.render("blogs/editBlogPost.hbs", { blog });
    })
    .catch((err) => {
      console.log("blog edit failed", err);
    });
});

router.post(
  "/blog/:id/edit",
  authMiddleware,
  fileUploader.single("imageUrl"),
  (req, res, next) => {
    const { title, problemStatement, solution, existingImage, mdnDocs, tags } =
      req.body;
    const { id } = req.params;

    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = existingImage;
    }
    BlogModel.findByIdAndUpdate(
      id,
      {
        title,
        problemStatement,
        solution,
        imageUrl,
        mdnDocs,
        tags,
      },
      { new: true }
    )
      .then(() => {
        res.redirect("/blogs");
      })
      .catch((err) => {
        console.log("blog update failed", err);
      });
  }
);

router.post("/blog/:id/delete", authMiddleware, (req, res, next) => {
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
