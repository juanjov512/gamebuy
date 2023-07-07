const express = require("express");
const faqSchema = require("../models/faq");

const router = express.Router();

// create faq
router.post("/faq", (req, res) => {
  const user = faqSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all faq's
router.get("/faq", (req, res) => {
  faqSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get faq
router.get("/faq/:id", (req, res) => {
  const { id } = req.params;
  faqSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update faq
router.put("/faq/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  faqSchema
    .updateOne({ _id: id }, { $set: { title, description } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete faq
router.delete("/faq/:id", (req, res) => {
  const { id } = req.params;
  faqSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
