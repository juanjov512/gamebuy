const mongoose = require("mongoose");

const tagSchema = mongoose.Schema({
  tag: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Tag", tagSchema);
