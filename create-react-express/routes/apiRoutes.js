const axios = require("axios");
const router = require("express").Router();
const path = require("path");

router.get("/search", (req, res) => {
  axios
    .get("https://www.googleapis.com/books/v1/volumes?key=AIzaSyBDFDXx2ctHtW1i6MjiLFy62rmRJdj2ckQ", {params: req.query })
    // .then(({ data: {results }}) => res.send(results.data.items[0].volumeInfo))
    .then(function(data) {
      let results = data.data.items;
      console.log(results);
      res.send(results);
    })
    .catch(err => res.status(422).json(err));
});
      // console.log(data.data.items[0].volumeInfo);

// if no API routes are hit, send the react app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
module.exports = router;

