module.exports = (...args) => {

    return (req, res, next) => {
        for (let arg of args) {
            if (arg.length !== 2) {
                return res.status(500).json({message: 'Invalid middleware configuration'});
            }
            const [validator, key] = arg;
            if (typeof validator !== 'function' || typeof key !== 'string') {
                return res.status(500).json({message: 'Invalid middleware configuration'});
            }
            if (validator(req.body[key])) {
                req.body[key] = req.body[key].trim();
            } else {
                return res.status(400).json({message: 'Invalid input'});
            }
        }
        next();
    };
};
