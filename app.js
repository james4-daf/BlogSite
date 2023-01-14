// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "Blog";

app.locals.appTitle = `${capitalized(projectName)}`;
// app.locals.loggedIn = false;

const session = require("express-session");
const MongoStore = require("connect-mongo");

// Advanced usage
app.use(
  session({
    secret: "keyboard cat",
    saveUninitialized: false, // don't create session until something stored
    resave: false,
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/blog-site",
      ttl: 14 * 24 * 60 * 60, // = 14 days. Default
    }),
  })
);

//default cookie name 'connect.sid'
// 👇 Start handling routes here

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const blogRoutes = require("./routes/blogs/blog.routes");
app.use("/", blogRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
