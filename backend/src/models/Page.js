// models/Page.js
const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  name: String,
  html: String,
  css: String,
});

module.exports = mongoose.model('Page', PageSchema);
