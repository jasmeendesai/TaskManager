const express = require('express')
const route = express.Router()
const {auth} = require('../middleware/userAuth')

const {register, login} = require('../controller/userController')

route.post('/register', register)
route.post('/login', login)


module.exports = route