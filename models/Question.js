const mongoose = require('mongoose')

let questionModel = new mongoose.Schema({
    queText:String,
    type:String,
    topic:String,
    studentId:String
})

let Question = mongoose.model("Question", questionModel)
module.exports = {Question}