const express = require("express");
const router = express.Router();


const {
  fetchUsers,
  getSingleFavoriteByUserId,
  fetchSingleUser,
} = require("./db");


//all users
router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchUsers());
  } catch (err) {
    next(err);
  }
});


//single user by id
router.get("/:id", async (req, res, next) => {
  try {
    res.send(await fetchSingleUser(req.params.id));
  } catch (err) {
    next(err);
  }
});

//getting favorite by user id
router.get("/:id/favorites", async (req, res, next) => {
  try {
    res.send(await getSingleFavoriteByUserId(req.params.id));
  } catch (err) {
    next(err);
  }
});
module.exports = router;