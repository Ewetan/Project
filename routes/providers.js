const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('./providers/dashboard', {
    user: req.user,
    page: "Dashboard"
  })
);

// router.get('/editprofile', ensureAuthenticated, (req, res) =>
//   res.render('editprofile', {
//     user: req.user
//   })
// );

// router.post('/editprofile', (req, res) => {
  
// });

module.exports = router;
