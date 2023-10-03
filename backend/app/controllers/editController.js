import EditorPage from "../models/EditorPage.js";

const savePreviewPage = async (req, res) => {
  const { html, css, page } = req.body;

  try {
    const existingPage = await EditorPage.findOne({ name: page });
    if (existingPage) {
      existingPage.html = html;
      existingPage.css = css;
      await existingPage.save();
    } else {
      await EditorPage.create({ name: page, html, css });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Database save error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

const loadPreviewPage = async (req, res) => {
  const { pageKey } = req.params;

  try {
    const page = await EditorPage.findOne({ name: pageKey });

    if (page) {
      res.json({ success: true, html: page.html, css: page.css });
    } else {
      res.json({ success: false, message: 'Page not found' });
    }
  } catch (error) {
    console.error('Database load error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

export {
  savePreviewPage,
  loadPreviewPage
};
