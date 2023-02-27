const { usersPool } = require("../../db");
const queries = require("./queries");

const getTodos = (req, res) => {
  const id = req.params.id; //parseInt(req.params.id);
  usersPool.query(queries.getTodos, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addTodo = (req, res) => {
  const {id, newTodo} = req.body;

  usersPool.query(queries.addTodo, [newTodo, id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send(newTodo);
    }
  });
};

const moveToDone = (req, res) => {
  const { id, todo } = req.body;

  // Update the 'today' and 'done' arrays in the database
  usersPool.query(
    queries.moveToDone,
    [todo, id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      } else {
        // Update the redux store with the new todo list
        const updatedTodoList = results.rows[0];
        res.status(200).json(updatedTodoList);
      }
    }
  );
};


module.exports = {
  getTodos,
  addTodo,
  moveToDone
};
