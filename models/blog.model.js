const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const blogSchema = new Schema(
  {
    title: String,
    problemStatement: String,
    solution: String,
    codeSnap: String,
    mdnDocs: [String],
  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const BlogModel = model("Blog", blogSchema);

module.exports = BlogModel;
