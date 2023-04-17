import express from "express";
import db from "./config/Database.js";
import router from "./routes/index.js";

// For Testing
// import Users from "./models/UserModel.js";

const app = express();

try {
  await db.authenticate();
  console.log("Database connected");
  // await Users.sync(); // jika tidak ada tabel, maka akan dibuatkan tabel baru
} catch (error) {
  console.error(error);
}

// For express JSON, untuk dapat menerima data dalam format JSON
app.use(express.json());

// For Middleware
app.use(router);

app.listen(5000, () => console.log(`Server running on port 5000`));
