const {Schema, model} = require("mongoose")

const messageSchema = new Schema({
    sender:{
        type:String,
        required:true
    },
    reciever:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true})


const Message = model("message", messageSchema)
module.exports = Message

