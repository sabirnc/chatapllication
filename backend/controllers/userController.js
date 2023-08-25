const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.secret_key, { expiresIn: "24h" });
};

//login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ token, username });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//signup user
const signupUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.signup(username, password);
    // create token
    const token = createToken(user._id);

    res.status(200).json({ token, username });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// get users
const getUsers = async (req, res) => {
  const { user } = req
  

  try {
    const users = await User.find({ _id:{$ne:user} });
    res.status(200).json({ users });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = { signupUser, loginUser, getUsers };
