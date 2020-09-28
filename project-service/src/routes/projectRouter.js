const express = require("express");
const router = express.Router();
const projectController = require('../controllers/projectController')


router.get('/', projectController.projectData)

module.exports = router;