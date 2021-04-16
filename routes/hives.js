const express = require('express');

const hivesController = require('../controllers/hives');

const router = express.Router();

router.get('/getFreeHiveNumber', hivesController.getFreeHiveNumber);
router.get('/getHivesAmountInApiary', hivesController.getHivesAmountInApiary)
router.get('/', hivesController.getHives);
router.post('/', hivesController.addHive);
router.put('/', hivesController.updateHive);
router.patch('/',hivesController.migrateHives)
router.delete('/', hivesController.deleteHive);
router.use((request, response) => response.status(404).end());

module.exports = router;