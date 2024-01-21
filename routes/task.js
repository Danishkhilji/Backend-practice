let express = require("express")
let router = express.Router()
let {createTask,getTasks, updateTask, deleteTask} = require('../contrrollers/task')
router.post('/createTask',createTask )
router.get('/tasks',getTasks)
router.put("/updatetask/:id",updateTask)
router.delete("/deletetask/:id",deleteTask)

module.exports = router