const jwt = require("jsonwebtoken");

// Generate JWT Token
const genAuthToken = (user) => {
  const secretKey = process.env.JWT_SEC;

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      country: user.country,
      city: user.city,
      password: user.password,
      confirmPassword: user.confirmPassword
    },
    secretKey
  );

  return token;
};

module.exports = genAuthToken;