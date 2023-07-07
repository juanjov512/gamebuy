const express = require("express");
const cartSchema = require("../models/cart");

const router = express.Router();

// create cart
router.post("/carts", (req, res) => {
  const cart = cartSchema(req.body);
  cart
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all carts
router.get("/carts", (req, res) => {
  cartSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get cart by user id
router.get("/user/cart/:id", (req, res) => {
  const { id } = req.params;
  cartSchema
    .find({ user: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update games in cart
router.put("/user/cart/:id", (req, res) => {
  const { id } = req.params;
  const { videogames } = req.body;

  cartSchema
    .updateOne({ user: id }, { $set: { videogames } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
