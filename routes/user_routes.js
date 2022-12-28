const mongoose = require('mongoose')
const express = require('express')
const { UserDB } = require('../models/Schema')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const userRouter = express.Router()
const jwt = require('jsonwebtoken')
const secret = 'MYSCRETEAPI'
userRouter.post('/signup', body('email').isEmail(), body('password').isLength({ min: 6 }), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        bcrypt.hash(req.body.password, 10, async function (err, hash) {
            if (err) {
                return res.status(400).send(err.message)
            }
            try {
                const user = await UserDB.create({
                    email: req.body.email,
                    password: hash
                })
                res.status(201).json({
                    status: 'Signup Succesfull',
                    user: user
                })
            } catch (e) {
                res.status(400).json({
                    status: 'Email aldready present',
                    message: e.message
                })
            }

        });


    } catch (e) {
        res.status(400).json({
            status: 'User not created',
            message: e.message
        })
    }

})


userRouter.post('/login', async (req, res) => {
    try {
        const user = await UserDB.findOne({ email: req.body.email })
        if (user) {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (result) {
                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: user._id
                    }, secret);
                    res.status(200).json({
                        status: 'Login Succesfull',
                        token: token
                    })

                } else {
                    res.status(400).json({
                        message: 'password not mactch'
                    })
                }


            });
        } else {
            res.status(400).json({
                message: 'Email is not registered'
            })
        }
    } catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
})



module.exports = userRouter