const { Schema , model } = require("mongoose")

const chatSchema = new Schema({
    participants:{
        type:[],
        required:true
    },
    messages:{
        type:[Object],
        required:true
    }
},{timestamps:true})

const Chat = model("chat" , chatSchema)
module.exports = Chat

