const express = require("express");
const { viewHomePage, viewCarsPage, viewOrdersPage } = require("../controller/views.controller");
const router = express.Router();

router.get('/', viewHomePage);
router.get('/data-mobil', viewCarsPage);
router.get('/data-orderan', viewOrdersPage)
module.exports = router;