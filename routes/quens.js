const express = require('express');

const quensController = require('../controllers/quens');

const router = express.Router();

router.get('/', quensController.getQuens);
router.post('/', quensController.addQuen);
router.delete('/', quensController.deleteQuen);
router.use((request, response) => response.status(404).end());

module.exports = router;