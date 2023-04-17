import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";

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

export { getUsers, Register };
