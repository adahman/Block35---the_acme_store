const express = require("express");
const app = express();
const baseQuery = "/api";
const { client } = require("./db")

app.use(express.json())
client.connect();



app.use(baseQuery + "/users", require("./users"));
app.use(baseQuery + "/products", require("./products"));
app.use(baseQuery + "/favorites", require("./favorites"));

app.listen(8080, () => {
  console.log("App is running at port 8080");
});