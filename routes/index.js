const express = require('express'),
  router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('template', { 
    locals: {
      title: 'Testing if the home page works'
    },
    partials : {
      content: 'partial-topics'
    }
  });
});

module.exports = router;
