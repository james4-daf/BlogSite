// Iteration #1
const mongoose = require("mongoose");

//1. Connect to DB
require("../db");

// 2. Adding Data
const BlogModel = require("../models/blog.model");

const blogData = [
  {
    title: "If statement in javascript",
    problemStatement: "What is the syntax for if statements in javascript",
    solution: "Bad Deadpool... Good Deadpool!",
    codeSnap:
      "https://images.theengineeringprojects.com/image/webp/2020/01/If-else-Statement-in-JavaScript-6.jpg.webp?ssl=1",
    mdnDocs: [
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else",
    ],
  },
  {
    title: "Functions in javascript",
    problemStatement: "How to write basic functions in javascript",
    solution:
      "need to use function keyword, followed by function name, parameter then {}",
    codeSnap: "https://miro.medium.com/max/1164/1*eGJEPEGMwd5iZf60o2KpMw.png",
    mdnDocs: [
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function",
    ],
  },
  {
    title: "Arrow functions in javascript",
    problemStatement:
      "ES6 updates bring a shorthand version of declaring functions",
    solution: "follow example below",
    codeSnap:
      "https://res.cloudinary.com/practicaldev/image/fetch/s--vlqQ-UWU--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/rhg7nntibsuufeibmt4u.png",
    mdnDocs: [
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions",
    ],
  },
];

BlogModel.create(blogData)
  .then(() => {
    console.log("Blogs added");
  })
  .catch(() => {
    console.log("Seeding failed");
  })
  //3. Closing
  .finally(() => {
    // 3. Closing the DB connection
    mongoose.connection.close();
    console.log("Connection closed");
  });
