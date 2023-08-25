const express = require("express")
const {signupUser , loginUser , getUsers } = require("../controllers/userController")
const messageController = require("../controllers/messageController")
const requireAuth = require("../middlewares/requireAuth")
const router = express.Router()




//login 
router.post('/login', loginUser)

//signup
router.post("/signup", signupUser)

// get users
router.get("/users" ,requireAuth,  getUsers)

// get messages
router.get("/messages",requireAuth,  messageController)

module.exports = router