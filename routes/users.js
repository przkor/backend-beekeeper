const express = require('express');
const { signInUser, signUpUser } = require('../controllers/users');

const router = express.Router();

//router.get('/user/signin', signInUser);
router.get('/signin', signInUser);
router.post('/signup', signUpUser);

router.use((request, response) => response.status(404).end());

module.exports = router;