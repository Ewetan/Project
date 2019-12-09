const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const expressValidator = require("express-validator");

// Load User model
const User = require("../models/User");
const { forwardAuthenticated } = require("../config/auth");

router.get("/", forwardAuthenticated, (req, res) =>
  res.render("index", { page: "Home" })
);

// Login Page
router.get("/login", forwardAuthenticated, (req, res) =>
  res.render("login", { page: "login" })
);

// Register Page
router.get("/register", forwardAuthenticated, (req, res) =>
  res.render("register", { page: "register" })
);

router.get("/providers", (req, res) =>
  res.render("providers", { page: "providers" })
);

// Register
router.post("/register", (req, res) => {
  const {
    name,
    email,
    password,
    password2,
    location,
    description,
    phonenumber
  } = req.body;
  let errors = [];

  if (
    !name ||
    !email ||
    !password ||
    !password2 ||
    !phonenumber ||
    !location ||
    !description
  ) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      page: "register",
      errors,
      name,
      email,
      password,
      password2,
      location,
      description,
      phonenumber
    });
  } else {
    User.findOne({ email: email } || { name: name }).then(user => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("register", {
          page: "register",
          errors,
          name,
          email,
          password,
          password2,
          location,
          description,
          phonenumber
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
          location,
          description,
          phonenumber
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                // res.redirect('/login', { page : "login"});
                res.redirect("/login", res.status(200).send(), {
                  page: "login"
                });
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});
// res.redirect(200, '/login', { page : "login"});

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/providers/dashboard",
    failureRedirect: "/login",
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/login");
});

module.exports = router;
