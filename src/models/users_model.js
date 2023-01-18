const mongoose = require("mongoose")
const Schema = mongoose.Schema

const usersSchema = new Schema({
    name: { type: String, min: 2, trim: true, default:"gamebrige kullanıcısı"},
    mail: { type: String, min: 8, max: 60, trim: true },
    username: { type: String, min: 6, max: 60, trim: true },
    pass: { type: String, min: 6, max: 60, trim: true },
    photo: { type: String, default: false },
    following:{type: Array,default:[]}
}, { timestamps: true })

const usersModel = mongoose.model("user", usersSchema)

module.exports = usersModel