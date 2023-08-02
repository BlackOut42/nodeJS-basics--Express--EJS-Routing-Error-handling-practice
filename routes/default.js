const express  = require('express');
const router = express.Router();

router.get("/", function (req, res) {
    //   const HtmlFilePath = path.join(__dirname, "views", "index.html");
    //   res.sendFile(HtmlFilePath);
    res.render("index"); //using ejs there is a faster way to find the file path and send the file using render and the template created by ejs '.ejs' files.
  });

  router.get("/about", function (req, res) {
    //   const HtmlFilePath = path.join(__dirname, "views", "about.html");
    //   res.sendFile(HtmlFilePath);
    res.render("about");
  });

  module.exports = router;