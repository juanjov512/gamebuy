const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "user",
  },
  videogames: {
    type: [Schema.ObjectId],
    ref: "videogame",
  },
});

module.exports = mongoose.model("Cart", cartSchema);
