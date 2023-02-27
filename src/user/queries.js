const getUsers = "SELECT * FROM users";
const getUserById = "SELECT name, country, city FROM users WHERE id = $1";

module.exports = {
  getUsers,
  getUserById,
};
