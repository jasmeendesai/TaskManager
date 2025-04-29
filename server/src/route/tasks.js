const express = require('express')
const route = express.Router()

const {createTasks, updateTasks, deleteTasks, getTasks}=require('../controller/taskController')
const {auth} = require('../middleware/userAuth')

route.post('/createTasks', auth, createTasks)
route.get('/getTasks', auth, getTasks)
route.put('/update/:id', auth, updateTasks)
route.delete('/delete/:id', auth, deleteTasks)

module.exports = route