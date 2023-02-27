const checkEmailExists = "SELECT s FROM users s WHERE s.email = $1";
const passwordValidation = "SELECT length($1) as password_length";
const getPasswordByEmail = "SELECT password FROM users WHERE email = $1"
const checkUserExists = `
  SELECT *
  FROM users
  WHERE email = $1
`;

const addUser =
  "INSERT INTO users(name, email, password, confirmPassword, country, city) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id";

module.exports = {
  checkEmailExists,
  checkUserExists,
  passwordValidation,
  getPasswordByEmail,
  addUser,
};
