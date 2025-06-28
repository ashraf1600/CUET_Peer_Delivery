const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register user
exports.register = async (req, res) => {
  try {
    const { stdId, name, email, hallName, password, description, role } =
      req.body;
    const user = new User({
      stdId,
      name,
      email,
      hallName,
      password,
      description,
      role,
    });
    await user.save();
    // Generate access token
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Exclude sensitive information like password before sending user info
    const { password: userPassword, ...userInfo } = user.toObject();

    res.status(201).json({ accessToken, refreshToken, user: userInfo });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid email or password");

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Exclude sensitive information like password before sending user info
    const { password: userPassword, ...userInfo } = user.toObject();

    res.json({ accessToken, refreshToken, user: userInfo });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Refresh token
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).send("Refresh token required");

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).send("Invalid refresh token");

    // Generate new access token
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Access token expires in 1 day
    );

    res.json({ accessToken });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
