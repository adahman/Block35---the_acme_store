const pg = require("pg");

const client = new pg.Client("postgres://localhost/the_acme_store");


//getting all Users
const fetchUsers = async () => {
  const response = await client.query(`SELECT * FROM "User" ORDER BY id ASC`);
  return response.rows;
};


//getting a signle User
const fetchSingleUser = async (id) => {
    const response = await client.query(`SELECT * FROM "User" WHERE id = $1`, [
      id,
    ]);
    return response.rows[0];
  };


//getting all products
const fetchProducts = async () => {
    const response = await client.query(
      `SELECT * FROM "Product" ORDER BY id ASC`
    );
    return response.rows;
  };


//getting all favorites
const fetchFavorites = async () => {
  const response = await client.query(
    `SELECT * FROM "Favorite" ORDER BY id ASC`
  );
  return response.rows;
};


//adding a favorite
const addFavorite = async (body) => {
  await client.query(
    `INSERT INTO "Favorite"(product_id, user_id) VALUES(now(), $1, $2)`,
    [body.product_id, body.user_id]
  );
  return {
    product_id: body.product_id,
    user_id: body.user_id,
  };
};


//deleting a favorite
const destroyFavorite = async (id) => {
  await client.query(`DELETE from "Favorite" WHERE id = $1`, [Number(id)]);
  return {
    id: id,
  };
};


//getting favorites by a user's id
const getFavoritesByUserId = async (params_id) => {
    const fav_response = await client.query(
      `SELECT * FROM "Favorite" WHERE user_id = $1`,
      [params_id]
    );
    return {
      favorites: fav_response.rows,
    };
  };



module.exports = {
fetchUsers,
fetchSingleUser,
fetchProducts,
fetchFavorites,
addFavorite,
destroyFavorite,
getFavoritesByUserId,
client,
};