const express = require("express");
const router = express.Router();
const {
  getAllfavorites,
  addFavorite,
  deleteFavorite,
} = require("./db");


//all favorites
router.get("/", async (req, res, next) => {
  try {
    res.send(await getAllfavorites());
  } catch (err) {
    next(err);
  }
});

//creating/adding a favorite
router.post("/", async (req, res, next) => {
  try {
    res.send(await addFavorite(req.body));
  } catch (err) {
    next(err);
  }
});


//deleting a favorite
router.delete("/:id", async (req, res, next) => {
  try {
    res.send(await deleteFavorite(req.params.id));
  } catch (err) {
    next(err);
  }
});
module.exports = router;