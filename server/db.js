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
const getAllfavorites = async () => {
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
const deleteFavorite = async (id) => {
  await client.query(`DELETE from "Favorite" WHERE id = $1`, [Number(id)]);
  return {
    id: id,
  };
};


//getting a single favorite by a user's id
const getSingleFavoriteByUserId = async (params_id) => {
  const response = await client.query(`SELECT * FROM "User" WHERE id = $1`, [
    params_id,
  ]);
  const { id, name } = response.rows[0];
  const res_response = await client.query(
    `SELECT * FROM "Favorite" WHERE user_id = $1`,
    [params_id]
  );
  return {
    id,
    name,
    favorite: res_response.rows,
  };
};


//getting a single favorite by a product's id
const getSingleFavoriteByProductId = async (params_id) => {
  const response = await client.query(
    `SELECT * FROM "Product" WHERE id = $1`,
    [params_id]
  );
  const { id, name } = response.rows[0];
  const res_response = await client.query(
    `SELECT * FROM "Favorite" WHERE product_id = $1`,
    [params_id]
  );
  return {
    id,
    name,
    favorite: res_response.rows,
  };
};

module.exports = {
fetchUsers,
fetchSingleUser,
fetchProducts,
getAllfavorites,
addFavorite,
deleteFavorite,
getSingleFavoriteByProductId,
getSingleFavoriteByUserId,
  client,
};