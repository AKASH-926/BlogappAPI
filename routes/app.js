const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const userRouter = require('./user_routes')
const blogRouter = require('./blog_routes')
const app = express()
const secret = 'MYSCRETEAPI'
const jwt = require('jsonwebtoken')
app.use(cors())
app.use(bodyparser.json())

app.use('/api', userRouter)

app.use(bodyparser.urlencoded({ extended: false }))
app.use('/api/blog', (req, res, next) => {

    try {

        const token = req.headers.authorization

        if (token) {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    return res.status(400).json({ message: err.message })
                }
                req.user = decoded.data
                next()
            });
        } else {
            res.status(400).json({
                message: 'token missing'
            })
        }
    } catch (e) {
        res.status(400).json({
            message: e.message
        })
    }

})

app.use('/api/blog', blogRouter)

module.exports = app