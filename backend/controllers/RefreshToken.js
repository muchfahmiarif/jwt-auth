import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken; // get refresh token from cookie
    if (!refreshToken) {
      return res.sendStatus(401); // if there isn't any token return 401 (unauthorized)
    }
    const user = await Users.findAll({
      // find user in database
      where: {
        refresh_token: refreshToken, // find user by refreshToken
      },
    });
    if (!user[0]) {
      return res.sendStatus(403); // if user doesn't exist return 403 (forbidden)
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      // verify the token
      if (err) {
        return res.sendStatus(403); // if token is not valid return 403 (forbidden)
      }
      const userId = user[0].id;
      const name = user[0].name;
      const email = user[0].email;
      const accessToken = jwt.sign(
        {
          userId: userId,
          name: name,
          email: email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "20s", // token will expire in 20 seconds
        }
      );
      res.json({
        // send new access token to client
        accessToken: accessToken,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export default refreshToken;
