const bcrypt = require("bcrypt");
const {usersPool} = require("../../db");
const queries = require("./queries");
const genAuthToken = require("../../utils/genAuthToken");
const saltRounds = 10;

// register user
const registerUser = (req, res) => {
  const { name, email, password, confirmPassword, country, city } = req.body;

  if (!name || !email || !password || !confirmPassword || !country || !city) {
    res.status(400).send("All fields are required.");
  } else if (password !== confirmPassword) {
    res.status(400).send("Passwords do not match.");
  } else {
    // check if email exists
    usersPool.query(queries.checkEmailExists, [email], (error, results) => {
      if (error) throw error;

      if (results.rows.length) {
        res.send("Email already exists.");
      } else {
        // validate password length
        usersPool.query(queries.passwordValidation, [password], (error, results) => {
          if (error) throw error;

          const passwordLength = results.rows[0].password_length;
          if (passwordLength < 6) {
            res.send("Password must be more than 6 characters");
          } else if (passwordLength > 27) {
            res.send("Password cannot be more than 27 characters");
          } else {
            // hash the password
            bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
              if (err) {
                console.error(err);
                res.status(500).send("Internal Server Error");
                return;
              }

              // add user to db
              usersPool.query(
                queries.addUser,
                [name, email, hashedPassword, confirmPassword, country, city],
                (error, results) => {
                  if (error) throw error;
                  //res.status(201).send("Account has been created!");
                  const id = results.rows[0].id;
                  const user = {
                    id,
                    name,
                    email,
                    hashedPassword,
                    country,
                    city
                  };
                  const token = genAuthToken(user);
                  res.status(201).json(token);
                }
              );
            });
          }
        });
      }
    });
  }
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send("Email and password are required.");
  } else {
    // check if email exists
    usersPool.query(queries.checkUserExists, [email], async (error, results) => {
      if (error) throw error;

      if (results.rows.length) {
        const user = results.rows[0];
        const hashedPassword = await usersPool.query(queries.getPasswordByEmail, [email]);

        const isMatch = await bcrypt.compare(
          password,
          hashedPassword.rows[0].password
        );

        if (isMatch) {
          // generate JWT token
          const token = genAuthToken(user);
          res.send(token);
        } else {
          res.status(401).send("Invalid credentials.");
        }
      } else {
        res.status(401).send("Invalid credentials.");
      }
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
