const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reportSchema = new Schema({
    report_towhat: { type: String},
    reported_item:{ type: Object},
    reporting_person:{type: String},
}, { timestamps: true })

const reportModel = mongoose.model("report", reportSchema)

module.exports = reportModel