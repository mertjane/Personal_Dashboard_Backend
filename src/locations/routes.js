const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/countries", controller.getCountries);
router.get("/cities", controller.getCities);

module.exports = router;