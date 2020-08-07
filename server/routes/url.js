const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
const fs = require('fs');
var FileReader = require('filereader')


const Url = require('../models/Url');
const File = require('../models/File');

// @route     POST /api/url/shorten
// @desc      Create short URL
router.post('/shorten', async (req, res) => {
  console.log("post long url route hit")
  const { longUrl } = req.body;
  const baseUrl = process.env.BASE_URL || "http://localhost:5000"

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base url');
  }

  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + '/' + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json({ 'msg': 'Invalid URL' });
  }
});



router.post('/upload', async (req, res) => {

  const { base64 } = req.body;

  try {
    const image = base64

    // Create url code
    const baseUrl = process.env.BASE_URL || "http://localhost:5000"
    const urlCode = "i" + shortid.generate();
    const fileUrl = baseUrl + '/' + urlCode;

    let file = new File({
      urlCode,
      fileUrl,
      image,
      date: new Date()
    });

    await file.save();

    console.log("file added to db", urlCode)

    res.json(file);

  } catch (error) {
    console.log("err is: ", error.message)
    res.status(401).json({ 'msg': 'Image not uploaded' });
  }


});

module.exports = router;
