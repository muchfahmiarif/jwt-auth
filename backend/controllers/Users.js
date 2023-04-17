import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

const Register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  // For Validation password
  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "Password and Confirm Password must be same",
    });
  }

  // Salt for hashing password
  const salt = await bcrypt.genSalt(10);

  // Hashing password
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const Login = async (req, rest) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email, // login berdasarkan email
      },
    });

    // Jika email ditemukan pada database, maka akan dilakukan pengecekan password dari client berdasarkan password yang ada di database
    const match = await bcrypt.compare(req.body.password, user[0].password);

    // Jika password tidak sesuai dengan password yang ada di database
    if (!match) {
      return res.status(400).json({
        message: "Email or Password is incorrect",
      });
    }

    // Jika password sesuai, maka akan diconstract access token dan refresh token
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;

    // Buat Access Token
    const accessToken = jwt.sign(
      {
        userId: userId,
        name: name,
        email: email,
      },
      process.env.ACCESS_TOKEN_SECRET, // secret key dari .env
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      {
        userId: userId,
        name: name,
        email: email,
      },
      process.env.REFRESH_TOKEN_SECRET, // secret key dari .env
      {
        expiresIn: "1d",
      }
    );

    // Simpan refresh token ke database, Users adalah nama model, refresh_token adalah nama kolom
    await Users.update(
      {
        refresh_token: refreshToken,
      },
      {
        where: {
          id: userId, // refresh token akan disimpan berdasarkan id user
        },
      }
    );
  } catch (error) {
    res.status(404).json({
      // Jika email tidak ditemukan
      message: "User not found",
    });
  }
};

export { getUsers, Register, Login };
