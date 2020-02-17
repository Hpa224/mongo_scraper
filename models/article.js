let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let schema = new Schema({
  title: {
    type: String,
    required: true
    },
  link: {
    type: String,
    required: true
    },
  note: {
    type: Schema.Types.ObjectId,
    ref: "note"
    }
  });

let article = mongoose.model("article", schema);
module.exports = article;


