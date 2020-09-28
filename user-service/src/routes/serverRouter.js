const express = require("express");
const router = express.Router();
const discoveryData = require('../controllers/DiscoveryData')


router.get('/', discoveryData.serverDataRetriver)

module.exports = router;