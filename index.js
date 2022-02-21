// console.log(global)
const fs = require('fs')

// fs.readFile("students.txt", function(err, data){
//     console.log(err)
//     if(!err){
//         console.log(data)
//     }else{
//         console.log("something went wrong")
//     }

// })

let data = fs.readFileSync("students.txt")
console.log(data)

let students = [
    'Himanshu', "Devendra", "parwez"
]



fs.appendFileSync("students.txt", students.join("\n"))