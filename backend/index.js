import express from "express";
import db from "./config/Database.js";
const app = express();

try {
  await db.authenticate();
  console.log("Database connected");
} catch {
  console.error(error);
}

app.listen(5000, () => console.log(`Server running on port 5000`));
