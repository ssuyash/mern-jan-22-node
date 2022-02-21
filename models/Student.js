const mongoose = require('mongoose')


let studentSchema = new mongoose.Schema({
    name:String,
    // dob:String,
    course:String,
    mobile:String,
    password:String
    // isMarried:Boolean,
    // fees:Number,
    
})

let Student = mongoose.model("Student", studentSchema)
module.exports = {Student}