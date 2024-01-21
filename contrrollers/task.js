let pool = require("../config/db")
// let {io,app} = require('../index')
let app = require('../index').app;
exports.createTask = (req,res)=>{
try{
    let {title, description, status} = req.body 
    if(!title) return res.status(400).json({messae:"Title is required"})
    pool.query('INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',[title,description,status],(error,result)=>{
        if(error) throw error
        // io.emit("newTask",{title, description, status})
        app.get('io').emit("newTask", { title, description, status });

        return res.status(201).json({messae:"Task has been created", result})
    })
}catch(error){
    res.status(500).json({messae:"Internal server error", error})

console.log(error)
}
}