const express = require("express");
const router = express.Router();
const {
  fetchProducts,
  getSingleFavoriteByProductId,
} = require("./db");



//all products
router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchProducts());
  } catch (err) {
    next(err);
  }
});


//single favorite  by id
router.get("/:id/favorites", async (req, res, next) => {
  try {
    res.send(await getSingleFavoriteByProductId(req.params.id));
  } catch (err) {
    next(err);
  }
});
module.exports = router;