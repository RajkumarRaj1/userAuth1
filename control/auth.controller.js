const AuthRouter = require("express").Router();
const { generateToken } = require("../jwt.util");
const authModel = require("../model/auth.model");

//login
AuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "email or password is not provider",
    });
  }
  try {
    const result = await authModel.findOne({
      email,
    });
    if (result && result._id) {
      //generate token
      if (result.password === password) {
        return res.status(200).json({
          token: generateToken(
            {
              name: result.name,
            },
            result._id
          ),
          message: "log in successful",
        });
      } else {
        return res.status(401).json({
          message: "email or password is incorrect",
        });
      }
    } else { 
      return res.status(404).json({
        message: "account does not exists",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
});

//reg
AuthRouter.post("/register", async (req, res) => {
  try {
    if (req.headers["token"]) {
      const result = await authModel(req.body);
      result.save();
      return res.status(200).json({
        message: "register successful",
      });
    } else {
      return res.status(400).json({
        message: "token is missing",
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "bad request",
      error: error.message,
    });
  }
});

//get all users
AuthRouter.get("/users", async (req, res) => {
  try {
    const result = await authModel.find();
    return res.status(200).json({
      message: "fetch successful all users",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
});

module.exports = {
  AuthRouter,
};
