const express = require("express");
const locationRoutes = require("./src/locations/routes")
const todoRoutes = require("./src/todos/routes")
const quoteRoutes = require("./src/quotes/routes")
const mantrasRoute = require("./src/mantras/routes")
const authRoutes = require("./src/auth/routes")
const userRoutes = require("./src/user/routes")
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
//const path = require("path");
const cors = require("cors");
const app = express();

dotenv.config();

// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

// parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
app.use("/api/v1/locations", locationRoutes)
app.use("/api/v1/quotes", quoteRoutes)
app.use("/api/v1/mantra", mantrasRoute)
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/todos", todoRoutes);
app.use("/api/v1/auth", authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, console.log("Server is running"));
