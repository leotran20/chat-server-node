const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const validator = require('validator');

const {validateInputs} = require('../middleware');
const {getGuestToken, signup, login} = require('../controllers/user.controller');

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/guest', getGuestToken);

router.post('/signup',
    validateInputs(
        [validator.isEmail, 'email'],
        // [validator.isStrongPassword, 'password'],
    ),
    signup,
);

router.post('/login',
    validateInputs(
        [validator.isEmail, 'email'],),
    login,
);

module.exports = router;
