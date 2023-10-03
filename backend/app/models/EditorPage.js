import mongoose from "mongoose";

const EditorPageSchema = new mongoose.Schema({
  name: String,
  html: String,
  css: String,
});

const EditorPage = mongoose.model('EditorPage', EditorPageSchema);

export default EditorPage;