const taskModel = require('../model/taskModel')
// const UserModel = require("../model/UserModel");



// Route 1 : create tasks of logged in user 
const createTasks = async(req, res)=>{
    try {
        const userId = req.userId
        const {title, description, tag} = req.body

        if (!title || !description) {
            return res
              .status(400)
              .send({ status: false, message: "Enter the required fields" });
        }

        req.body.user = userId
        const createTask = await taskModel.create(req.body)
        const {__v, user, ...data} = createTask._doc
        return res.status(201).send({
            status: true,
            message: "Task Created Successfully",
            data: data,
          });
}
catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

// Route 2 : get all tasks of logged in user
const getTasks = async (req, res)=>{
    try {
        const userId = req.userId
        const {status} = req.query

        console.log(status)

        let filter = {
            user : userId
        }

        if(status && ["Pending", "Completed"].includes(status)) filter.status = status

        console.log(filter)

        const tasks = await taskModel.find(filter)

        console.log(tasks)

        if(tasks.length===0){
            return res.status(404).send({ status: false, message: "No tasks present"});
        }

        return res.status(200).send({
            status: true,
            message: "Tasks data",
            data: tasks,
        });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }

}

// Route 3 : update tasks of logged in user 
const updateTasks = async (req, res)=>{
    try {
        const taskId = req.params.id
        const {title, description, status} = req.body


     

        const data = {} //update queries

        if(title){ 
            data.title = title
        }
        
        if(description){
            data.description = description
        }
        if(status && ["Pending", "Completed"].includes(status)){
            data.status = status
        }

        const task = await taskModel.findById(taskId)
        if(!task){
            return res.status(404).send({ status: false, message: "task not found"})
        }
        
        //user authorisation

        const userLoggedIn = req.userId
        const userToBeModify = task.user.toString()
        if(userLoggedIn!==userToBeModify){
            return res.status(403).send({ status: false, message: "you are not authorised" });
        }
        
        //update task
        const updatedNote = await taskModel.findByIdAndUpdate(taskId, data, {new : true}).select({_id : 0, __v : 0, user : 0})

        return res.status(200).send({ status: true, message: "task is updated", data : updatedNote})


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

// Route 4 : delete tasks of logged in user 
const deleteTasks = async (req, res) =>{
    try {
        const taskId = req.params.id

        const task = await taskModel.findById(taskId)
        if(!task){
            return res.status(404).send({ status: false, message: "task not found"})
        }
        
        //user authorisation

        const userLoggedIn = req.userId
        const userToBeModify = task.user.toString()
        if(userLoggedIn!==userToBeModify){
            return res.status(403).send({ status: false, message: "you are not authorised" });
        }
        
        await taskModel.findByIdAndDelete(taskId)

        return res.status(200).send({ status: true, message: "task is deleted successfully" });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


module.exports = {createTasks, getTasks, updateTasks, deleteTasks}
