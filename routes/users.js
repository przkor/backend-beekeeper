const express = require('express');
const { signInUser, signUpUser } = require('../controllers/users');

const router = express.Router();

router.get('/signin', signInUser);
router.post('/signup', signUpUser);

router.use((request, response) => response.status(404).end());

module.exports = router;


/*
module.exports = function(server) {

    const router = express.Router() 
    router.get('/signin', function(req, res) {
        console.log(req.server)
        res.send('Hello from index.js!')
    })
    return router
    */

    /*
    router.get('/signin', function(req, res) {
        console.log('bq:',server.locals.db)
        res.send('Hello from index.js!')
    })
}
    */

    
