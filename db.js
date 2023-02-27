const Pool = require("pg").Pool;
require('dotenv').config();


const usersPool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "users", 
    password: process.env.DATABASE_PASS,
    port: 5433,
});

const countriesPool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "countries", 
    password: process.env.DATABASE_PASS,
    port: 5433,
});

const citiesPool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "cities",
    password: process.env.DATABASE_PASS,
    port: 5433,
})

const quotesPool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "quotes",
    password: process.env.DATABASE_PASS,
    port: 5433,
})

const mantrasPool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "mantra",
    password: process.env.DATABASE_PASS,
    port: 5433,
})

/* const todoPool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "todoList",
    password: process.env.DATABASE_PASS,
    port: 5433,
}) */


module.exports = { usersPool, countriesPool, citiesPool, quotesPool, mantrasPool};



