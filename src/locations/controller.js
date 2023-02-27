const {countriesPool, citiesPool} = require("../../db");
const queries = require("./queries");

// get countries
const getCountries = (req, res) => {
  countriesPool.query(queries.getCountries, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

// get cities
const getCities = (req, res) => {
  citiesPool.query(queries.getCities, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

module.exports = {
  getCountries,
  getCities
};
