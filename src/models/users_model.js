const mongoose = require("mongoose")
const Schema = mongoose.Schema

const usersSchema = new Schema({
    name: { type: String, min: 2, max: 25, trim: true, default:"gamebrige kullanıcısı"},
    mail: { type: String, min: 8, max: 60, trim: true },
    username: { type: String, min: 6, max: 60, trim: true },
    pass: { type: String, min: 6, max: 60, trim: true },
    loginMethod: { type: String, default:"app"},
    photo: { type: String, default: false },
    fbuid:{ type: String },
    following:{type: Array,default:[]},
    followers:{type: Array,default:[]}
}, { timestamps: true })

const usersModel = mongoose.model("user", usersSchema)

module.exports = usersModel