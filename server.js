const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


const SERVER_SECRET = "abdrakadabra"
const saltRound = 10


require('./config/database')


const {Student} = require('./models/Student')
const {Question} = require('./models/Question')

app.use(cors())
app.use(bodyParser.json())



// app.get("/login", (req, res)=>{
//     let {mobile, password} = req.query
//     if(mobile == "8878071281" && password == "12345"){
//         res.send({stauts:"OK", msg:"login successfully"})
//     }else{
//         res.send({stauts:"ERR", msg:"invalid username or password", action:"Krishna idhar dhyaan do"})

//     }
// })



app.post("/", (req, res)=>{
    res.send({status:"OK", method:"POSST"})
})

app.post('/upload', upload.single('profileimage') ,(req, res)=>{
    console.log(req.file)
    res.send({msg:"uploaded"})
})

app.post("/students", async (req, res)=>{
    let {name, course, mobile, password} = req.body
    console.log(name, course);

    let data = await Student.findOne({mobile})
    if(data != null ){
        res.send({stauts:"ERR", msg:"Mobile already registered."})
    }else{

        let hash = await bcrypt.hash(password, saltRound)
        try{
            await Student.create({name, course, mobile, password:hash})
            res.send({status:"OK", msg:"Student added successfully."})
        }catch(e){
            res.send({status:"ERR", msg:e})
        }
    }

    
    //res.send("working")
})

app.get("/students", async (req, res)=>{
    let students = await Student.find({name:"himanshu"})
    res.send({status:"OK", msg:"", result:students})
})


app.post("/login", async(req, res)=>{
    let {mobile, password} = req.body
    let data = null

    try{
        data = await Student.findOne({mobile})
        if(data){
            let {password:hash} = data
            let verified = await bcrypt.compare(password, hash)
            if(verified){
                var token = jwt.sign({ id:data._id }, SERVER_SECRET);
                res.send({status:"OK", msg:"Login Successfully", token})
            }else{
            res.send({stauts:"ERR", msg:"Invalid mobile or password"})

            }
        }else{
            res.send({stauts:"ERR", msg:"Invalid mobile or password"})
        }
    }catch(e){
        return res.send({stauts:"ERR", msg:"Something went wrong on db server"})
    }

    
    // res.send({data})
})


app.post("/question", async (req, res)=>{
    let { queText,
        type,
        topic,
        token} = req.body

        try{
            var decoded = jwt.verify(token, SERVER_SECRET);
        }catch(e){
            return res.send({stauts:"ERR", msg:"Invalid Authentication Token"})

        }

        let data = await Question.create({
            queText, type, topic, studentId:decoded.id
        })

        return res.send({stauts:"OK", msg:"Question Saved Successfully"})

        // res.send(decoded.id)

})

app.post('/update-student', async (req, res)=>{
    let {course, name} = req.body

   let dbRes = await Student.updateOne({name}, {course})
   console.log(dbRes);
    res.send({stauts:"OK", msg:"updated successfully"})
})

app.post('/delete-student', async (req, res)=>{
    let { name} = req.body
    let filterObj = {name}
   let dbRes = await Student.deleteOne(filterObj)
   console.log(dbRes);
    res.send({stauts:"OK", msg:"deleted successfully"})
})


app.listen(8080)

//api par kaam kr rhe h to hmaara froned(client) postman hai, usi k hisaaab se logic sochna hai



// axios.post("url", {
//     name:"",
// })


//CRUD => Create Read Update Delete