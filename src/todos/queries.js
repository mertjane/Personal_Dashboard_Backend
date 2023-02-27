const getTodos = "SELECT * FROM todolist WHERE id = $1";
const addTodo = "UPDATE todoList SET today = array_append(today, $1) WHERE id = $2 RETURNING *";
const moveToDone = "UPDATE todolist SET today = array_remove(today, $1), done = array_append(done, $1) WHERE id = $2 RETURNING *";

module.exports = {
  getTodos,
  addTodo,
  moveToDone
};