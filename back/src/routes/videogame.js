const express = require("express");
const videoGameSchema = require("../models/videogame");

const router = express.Router();

// create video game
router.post("/videogames/", async (req, res) => {
  const videogame = new videoGameSchema();
  videogame.name = req.body.name;
  videogame.description = req.body.description;
  videogame.value = req.body.value;
  videogame.tags = req.body.tags;

  if (req.files) {
    if (req.files.image[0]) {
      videogame.image = req.files.image[0].path;
    }
    if (req.files.file[0]) {
      videogame.file = req.files.file[0].path;
    }
  }

  await videogame
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all video games
router.get("/videogames", (req, res) => {
  videoGameSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get video game by filter
router.get("/videogames/filters/:tags", (req, res) => {
  const { tags } = req.params;
  videoGameSchema
    .find({ tags: { $all: tags } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get video game
router.get("/videogames/:id", (req, res) => {
  const { id } = req.params;
  videoGameSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update video game
router.put("/videogames/:id", (req, res) => {
  const { id } = req.params;
  let { name, description, image, value, tags, file } = req.body;
  if (req.files) {
    if (req.files.image[0]) {
      image = req.files.image[0].path;
    }
    if (req.files.file[0]) {
      file = req.files.file[0].path;
    }
  }
  videoGameSchema
    .updateOne(
      { _id: id },
      { $set: { name, description, image, value, tags, file } }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete video game
router.delete("/videogames/:id", (req, res) => {
  const { id } = req.params;
  videoGameSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get file of video game
router.get("/videogames/download/:id", (req, res) => {
  const { id } = req.params;
  videoGameSchema
    .findById(id)
    .then((data) => res.download(data.file))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
