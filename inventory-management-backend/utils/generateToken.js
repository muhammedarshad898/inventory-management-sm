const jwt = require("jsonwebtoken");

// Generates a JWT signed with the user's id, expires in 7 days
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = generateToken;