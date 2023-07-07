const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/user");
const tagRoutes = require("./routes/tag");
const videogameRoutes = require("./routes/videogame");
const faqRoutes = require("./routes/faq");
const cartRoutes = require("./routes/cart");
const auth = require("./routes/auth");
const upload = require("./controllers/upload");
const app = express();
const port = process.env.PORT || 9000;
var cors = require("cors");

// middleware
app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", tagRoutes);
app.use(
  "/api",
  upload.fields([{ name: "image" }, { name: "file" }]),
  videogameRoutes
);
app.use("/api", faqRoutes);
app.use("/api", cartRoutes);
app.use("/api", auth);

// routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

app.listen(port, () => console.log("server listening on port", port));

module.exports = app;
