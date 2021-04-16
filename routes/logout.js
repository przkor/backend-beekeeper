const express = require('express');
const { logout } = require('../controllers/logout');

const router = express.Router();

//router.get('/user/signin', signInUser);
router.get('', logout);

router.use((request, response) => response.status(404).end());

module.exports = router;