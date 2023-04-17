import express from "express";
import db from "./config/Database.js";
import Users from "./models/UserModel.js";

const app = express();

try {
  await db.authenticate();
  console.log("Database connected");
  await Users.sync(); // jika tidak ada tabel, maka akan dibuatkan tabel baru
} catch (error) {
  console.error(error);
}

app.listen(5000, () => console.log(`Server running on port 5000`));
