const express = require("express");
const router = express.Router();


const {
  fetchUsers,
  getFavoritesByUserId,
  fetchSingleUser,
  addFavorite,
  destroyFavorite
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
    res.send(await getFavoritesByUserId(req.params.id));
  } catch (err) {
    next(err);
  }
});

//adding a favorite
router.post("/:userId/favorites", async (req, res, next) => {
    try {
      res.send(await addFavorite(req.body));
    } catch (err) {
      next(err);
    }
  });
  
  
  //deleting a favorite
  router.delete("/:userId/favorites/:id", async (req, res, next) => {
    try {
      res.send(await destroyFavorite(req.params.id));
    } catch (err) {
      next(err);
    }
  });


module.exports = router;