const { mantrasPool } = require("../../db");
const queries = require("./queries");

// get countries
const getMantras = (req, res) => {
  mantrasPool.query(queries.getMantras, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

module.exports = {
  getMantras,
};
