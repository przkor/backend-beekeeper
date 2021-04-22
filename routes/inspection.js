const express = require('express');

const inspectionController = require('../controllers/inspection');

const router = express.Router();

router.get('/', inspectionController.getInspection);
router.post('/', inspectionController.addInspection);
router.use((request, response) => response.status(404).end());

module.exports = router;