const mongoose = require("mongoose")
const Schema = mongoose.Schema

const blogsSchema = new Schema({
    blog_author: { type: String},
    blog_author_username:{ type: String},
    blog_title: { type: String},
    blog_text: { type: String }
}, { timestamps: true })

const blogsModel = mongoose.model("blog", blogsSchema)

module.exports = blogsModel