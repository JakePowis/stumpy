const express = require('express');
const router = express.Router();

const Url = require('../models/Url');
const File = require('../models/File');

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get('/:code', async (req, res) => {
  try {
    console.log(`${req.params.code} route hit, first letter is ${req.params.code[0]}`)

    //all Image codes
    if (req.params.code[0] === "i") {

      const file = await File.findOne({ urlCode: req.params.code });

      if (file) {

        //send back image block with base 64 image
        res.send(`<img src=${file.image}>`)

      } else {
        return res.status(404).json('No url found');
      }

    } //all URL codes
    else {

      const url = await Url.findOne({ urlCode: req.params.code });

      if (url) {
        return res.redirect(url.longUrl);
      } else {
        return res.status(404).json('No url found');
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

module.exports = router;
