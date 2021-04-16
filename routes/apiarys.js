const express = require('express');

const apiarysController = require('../controllers/apiarys');

const router = express.Router();

router.get('/', apiarysController.getApiarys);
router.post('/', apiarysController.addApiary);
router.put('/', apiarysController.updateApiary);
router.delete('/', apiarysController.deleteApiary);
router.use((request, response) => response.status(404).end());

module.exports = router;