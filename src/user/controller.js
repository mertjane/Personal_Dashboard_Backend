const { usersPool } = require("../../db");
const queries = require("./queries");

// get all users
const getUsers = (req, res) => {
  usersPool.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

// get user
const getUserById = (req, res) => {
  const id = req.params.id; //parseInt(req.params.id);
  usersPool.query(queries.getUserById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};


module.exports = {
  getUsers,
  getUserById
};
