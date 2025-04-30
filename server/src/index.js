const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const {PORT,MONGODB_STRING}=process.env

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


mongoose.connect(MONGODB_STRING,{
    useNewUrlParser : true
})
.then(()=>
    console.log("MongoDb is connected")
).catch((err)=> console.log(err.message))


app.use('/api/user', require('./route/user'))
app.use('/api/tasks', require('./route/tasks'))

app.listen(PORT,()=>{
    console.log(`Express is app is running on port ${PORT}`)
})