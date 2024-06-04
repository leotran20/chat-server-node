const jwt = require('jsonwebtoken');
const {SKIP_AUTHENTICATE} = require('../config/constants');

module.exports = (req, res, next) => {
    if (SKIP_AUTHENTICATE.includes(req.path)) {
        return next();
    }
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({message: 'Auth Error'});
    }
    try {
        if (token.split(' ')[0] === 'Bearer') {
            token = token.split(' ')[1];
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = {id: decoded.id};
        return next();
    } catch (e) {
        console.error(e);
        return res.status(401).send({message: 'Invalid Token'});
    }

};

