const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/:id", controller.getTodos);
router.post("/", controller.addTodo);
router.put("/done", controller.moveToDone)

module.exports = router;