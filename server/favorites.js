const express = require("express");
const router = express.Router();
const {
  fetchFavorites
} = require("./db");


//all favorites
router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchFavorites());
  } catch (err) {
    next(err);
  }
});


module.exports = router;