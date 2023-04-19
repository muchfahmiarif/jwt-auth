import express from "express";
import db from "./config/Database.js";
import router from "./routes/index.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// For Testing
// import Users from "./models/UserModel.js";

dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database connected");
  // await Users.sync(); // jika tidak ada tabel, maka akan dibuatkan tabel baru
} catch (error) {
  console.error(error);
}

// Cookie Parser is used to parse the cookie header and populate req.cookies with an object keyed by the cookie names.
app.use(cookieParser());

// For express JSON, untuk dapat menerima data dalam format JSON
app.use(express.json());

// For Middleware
app.use(router);

app.listen(5000, () => console.log(`Server running on port 5000`));
