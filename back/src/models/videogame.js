const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoGameSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  tags: {
    type: [Schema.ObjectId],
    ref: "tag",
  },
  file: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("VideoGame", videoGameSchema);
