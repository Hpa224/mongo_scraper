let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let schema = new Schema({
  title: String,
  body: String
  });

let note = mongoose.model("note", schema);

module.exports = note;

