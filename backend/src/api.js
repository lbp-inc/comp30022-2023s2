const express = require('express');
const router = express.Router();
const Page = require('./models/Page');  
require('dotenv').config();


router.post('/save', async (req, res) => {
  const { html, css, page } = req.body;

  try {
    const existingPage = await Page.findOne({ name: page });
    if (existingPage) {
      existingPage.html = html;
      existingPage.css = css;
      await existingPage.save();
    } else {
      await Page.create({ name: page, html, css });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Database save error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.get('/load/:pageKey', async (req, res) => {
  const { pageKey } = req.params;

  try {
    const page = await Page.findOne({ name: pageKey });

    if (page) {
      res.json({ success: true, html: page.html, css: page.css });
    } else {
      res.json({ success: false, message: 'Page not found' });
    }
  } catch (error) {
    console.error('Database load error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
