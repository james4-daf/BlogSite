const authMiddleware = (req, res, next) => {
  if (req.session.loggedInUser) {
    req.app.locals.loggedIn = true;
    next();
  } else {
    req.app.locals.loggedIn = false;
    res.redirect("/login");
  }
};

module.exports = { authMiddleware };
