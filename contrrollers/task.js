let pool = require("../config/db")
// let {io,app} = require('../index')
// let app = require('../index').app;
exports.createTask = (req, res) => {
    try {
        let { title, description, status } = req.body
        if (!title) return res.status(400).json({ messae: "Title is required" })
        let query = 'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)'
        pool.query(query, [title, description, status], (error, result) => {
            if (error) throw error
            // io.emit("newTask",{title, description, status})
            // app.get('io').emit("newTask", { title, description, status });

            return res.status(201).json({ messae: "Task has been created", result })
        })
    } catch (error) {
        res.status(500).json({ messae: "Internal server error", error })

        console.log(error)
    }
}

exports.getTasks = (req,res)=>{
    try{
        let query = "SELECT * FROM tasks"
        pool.query(query, (error,result)=>{
            if(error) throw error
            return res.status(200).json({messae:"All tasks",result})
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({message: "Internval server error", error})

    }
}

exports.updateTask = (req,res)=>{
    try{
        let {id} = req.params
        let data = req.body

        let query = "UPDATE tasks SET ? WHERE id = ?"
        pool.query(query,[data,id],(error,result)=>{
            if(error) throw error
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Task not found" });
            }
            return res.status(200).json({message:"data has been updated",result})
        })    
    }catch(error){
        console.log(error)
        return res.status(500).json({messae:"internal server error", error})
    }
}

exports.deleteTask = (req,res)=>{
    try{
        let {id} = req.params

        let query = "DELETE from tasks WHERE id = ?"
        pool.query(query,id,(error,result)=>{
            if(error) throw error
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Task not found" });
            }
            return res.status(200).json({message:"task has been deleted",result})
        })    
        
    }catch(error){
        console.log(error)
        return res.status(500).json({messae:"internal server error", error})
    }
}