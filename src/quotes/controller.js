const {quotesPool} = require("../../db");
const queries = require("./queries");

// get countries
const getQuotes = (req, res) => {
    quotesPool.query(queries.getQuotes, (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
  };

  module.exports = {
    getQuotes,
  };
  