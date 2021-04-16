const express = require('express');
const { getTasks, addTask, updateTask,deleteTask } = require('../controllers/tasks');

const router = express.Router();

router.get('/', getTasks);
router.post('/', addTask);
router.delete('/',deleteTask);
router.put('/',updateTask);

router.use((request, response) => response.status(404).end());

module.exports = router;