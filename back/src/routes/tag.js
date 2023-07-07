const express = require("express");
const tagSchema = require("../models/tag");

const router = express.Router();

// create tag
router.post("/tags", (req, res) => {
  const tag = tagSchema(req.body);
  tag
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all tags
router.get("/tags", (req, res) => {
  tagSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get tag
router.get("/tags/:id", (req, res) => {
  const { id } = req.params;
  tagSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update tag
router.put("/tags/:id", (req, res) => {
  const { id } = req.params;
  const { tag } = req.body;
  tagSchema
    .updateOne({ _id: id }, { $set: { tag } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete tag
router.delete("/tags/:id", (req, res) => {
  const { id } = req.params;
  tagSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
