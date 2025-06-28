const User = require("../models/User");

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, description } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, description },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get all users (optional)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Delete user by userId
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Delete the user
    await User.findByIdAndDelete(userId);

    res.status(200).send("User deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
