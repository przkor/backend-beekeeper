const express = require('express');
const { getTasks, addTask,finishTask, updateTask,deleteTask } = require('../controllers/tasks');

const router = express.Router();

router.get('/', getTasks);
router.post('/', addTask);
router.patch('/',finishTask);
router.delete('/',deleteTask);
router.put('/',updateTask);

router.use((request, response) => response.status(404).end());

module.exports = router;