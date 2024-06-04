const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const CONSTANTS = require('../config/constants');
const User = require('../models/Users');

const UserController = {
    get: (req, res, next) => {
        res.send('respond with a resource');
    },
    getGuestToken: (req, res) => {
        const guestToken = jwt.sign({
                id: CONSTANTS.GUEST_ID,
            },
            process.env.SECRET_KEY,
            {
                expiresIn: '1h',
            });
        return res.send({token: guestToken});
    },
    signup: async (req, res) => {
        const {email, name, password} = req.body;

        const hash = bcrypt.hashSync(password, 10);
        const instance = await User.create({
            email,
            name,
            password: hash,
        });

        const token = jwt.sign({
                id: instance.id,
            },
            process.env.SECRET_KEY,
            {
                expiresIn: '1h',
            });
        return res.send({token});
    },
    login: async (req, res) => {
        const {email, password} = req.body;

        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(404).send({message: 'User not found'});
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).send({message: 'Invalid credentials'});
        }

        const token = jwt.sign({
                id: user.id,
            },
            process.env.SECRET_KEY,
            {
                expiresIn: '1h',
            });

        return res.send({token, user});

    },

};

module.exports = UserController;
