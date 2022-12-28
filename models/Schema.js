const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId


const users = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})


const Blog_schema = new Schema({
    image: { type: String },
    title: { type: String },
    description: { type: String },
    author: { type: String },
    date: { type: Date },
    user: { type: ObjectId, ref: 'users' }
})

const UserDB = mongoose.model('UserDB', users)
const BlogDB = mongoose.model('BlogDB', Blog_schema)

module.exports = { UserDB, BlogDB }