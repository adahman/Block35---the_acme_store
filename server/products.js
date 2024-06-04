const express = require("express");
const router = express.Router();
const {
  fetchProducts,
} = require("./db");



//all products
router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchProducts());
  } catch (err) {
    next(err);
  }
});



module.exports = router;