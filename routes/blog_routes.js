const mongoose = require('mongoose')
const express = require('express')
const { BlogDB } = require('../models/Schema')
const cloudinary = require('cloudinary').v2

const blogRouter = express.Router()


blogRouter.post('/', async (req, res) => {
    try {

        const blog = await BlogDB.create({
            image: req.body.image,
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            date: Date.now(),
            user: req.user
        })
        res.status(201).json({
            status: 'Blog created succesfully',
            blog: blog
        })

    } catch (e) {
        res.status(400).json({
            status: 'Blog not created succesfully',
            message: e.message
        })
    }
})
blogRouter.get('/', async (req, res) => {

    try {
        const blogs = await BlogDB.find({ user: req.user })
        res.status(200).json({
            status: 'Blogs fetched succesfully',
            blog: blogs
        })
    } catch (e) {
        res.status(400).json({
            status: 'There are no blogs',
            message: e.message
        })
    }
})

module.exports = blogRouter
